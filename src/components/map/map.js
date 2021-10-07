window.maps = [];

// Center coordinates, zoom factor and HTML-element to render in.
function getNewMapObject(latitude, longitude, zoom, container, apiKey) {
  let map = new maplibregl.Map({
    container: container,
    style: "https://api.maptiler.com/maps/ef955669-6ec4-4320-b5c3-bb2e0732700f/style.json?key=" + apiKey,
    center: [latitude, longitude],
    zoom: zoom,
    locale: {
      "FullscreenControl.Enter": "Vis i fullskjerm",
      "FullscreenControl.Exit": "Gå ut av fullskjermsvisning",
      "NavigationControl.ZoomIn": "Zoom inn",
      "NavigationControl.ZoomOut": "Zoom ut",
    },
    dragRotate: false,
  });

  let nav = new maplibregl.NavigationControl({
    showCompass: false,
  });

  let scale = new maplibregl.ScaleControl({
    maxWidth: 80,
    unit: "metric",
  });

  map.addControl(nav, "top-left");
  map.addControl(scale);
  map.scrollZoom.disable();

  // Adds custom images for use in markers later.
  map.loadImage("https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/location-pin-filled.png", function (error, image) {
    if (error) throw error;
    map.addImage("location-pin-filled", image);
  });

  window.maps[map._mapId] = [];
  window.maps[map._mapId]["layerIds"] = [];
  window.maps[map._mapId]["dataSourceIds"] = [];

  return map;
}

function addPopupFromMetadata(map, layerId) {
  // When a click event occurs on a feature in the layer, open a popup at the
  // location of the feature, with HTML generated from its properties.
  map.on("click", layerId, function (event) {
    let heading = event.features[0].properties.heading ?? "";
    let description = event.features[0].properties.desc ?? "";
    let additionalData = event.features[0].properties.data ? JSON.parse(event.features[0].properties.data) : [];
    let additionalDataHtml = "";

    if (heading.length > 0) {
      heading = "<h3 class='osg-map__heading'>" + heading + "</h3>";
    }

    // Need a better way to handle this in the future.
    if (description === "null") {
      description = "";
    }

    if (additionalData.length > 0) {
      additionalData.forEach(function (data) {
        let label = data.label ?? "";
        let value = data.value ?? "";

        if (label.length > 0 && value.length > 0) {
          additionalDataHtml = additionalDataHtml + "<span class='osg-map__label'>" + label + "</span>: <span class='osg-map__value'>" + value + "</span><br>";
        }
      });
    }

    if (heading.length > 0 || description.length > 0) {
      new maplibregl.Popup({ className: "osg-map__popup" })
        .setLngLat(event.lngLat)
        .setHTML("<div class='osg-map__popup-content'>" + heading + description + additionalDataHtml + "</div>")
        .addTo(map);
    }
  });

  // Change the cursor to a pointer when over the feature/layer.
  map.on("mouseenter", layerId, function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", layerId, function () {
    map.getCanvas().style.cursor = "";
  });
}

function addPoint(map, dataSourceId, point, hasPopup = true) {
  addPoints(map, dataSourceId, [point], hasPopup);
}

function addPoints(map, dataSourceId, points, hasPopup = true) {
  let features = [];

  points.forEach(function (point) {
    let heading = point.heading ?? "";
    let description = point.desc ?? "";

    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.latitude, point.longitude],
      },
      properties: {
        heading: heading,
        desc: description,
      },
    });
  });

  let geoJsonData = {
    type: "FeatureCollection",
    features: features,
  };

  let layerId = dataSourceId + "-points";

  map.addSource(dataSourceId, {
    type: "geojson",
    data: geoJsonData,
  });

  window.maps[map._mapId]["dataSourceIds"].push(dataSourceId);

  addLayerType(map, layerId, "point", dataSourceId);

  if (hasPopup) {
    addPopupFromMetadata(map, layerId);
  }
}

function addLayerType(map, layerId, layerType, dataSourceId) {
  window.maps[map._mapId]["layerIds"].push(layerId);

  switch (layerType) {
    case "polygon":
      // Adds fill + line to get an outline / stroke on the polygon.
      map.addLayer({
        id: layerId,
        type: "fill",
        source: dataSourceId,
        paint: {
          "fill-color": "#2a2859", // blue-dark, but we can't use classes here :(
          "fill-opacity": 0.4,
        },
        filter: ["==", "$type", "Polygon"],
      });

      map.addLayer({
        id: layerId + "-outline",
        type: "line",
        source: dataSourceId,
        paint: {
          "line-color": "#2a2859", // blue-dark, but we can't use classes here :(
          "line-width": 1,
        },
        filter: ["==", "$type", "Polygon"],
      });

      window.maps[map._mapId]["layerIds"].push(layerId + "-outline");

      break;

    case "line":
      map.addLayer({
        id: layerId,
        type: "line",
        source: dataSourceId,
        paint: {
          "line-color": "#2a2859", // blue-dark, but we can't use classes here :(
          "line-width": 2,
        },
        filter: ["==", "$type", "LineString"],
      });
      break;

    case "point":
      map.addLayer({
        id: layerId,
        type: "symbol",
        source: dataSourceId,
        layout: {
          "icon-image": "location-pin-filled",
          "icon-allow-overlap": true,
        },
        filter: ["==", "$type", "Point"],
      });

      break;

    case "cluster":
      // A cluster is made up of three layers. One for the circles, one for the number/count and one for the points that are not in a cluster.
      map.addLayer({
        id: layerId,
        type: "circle",
        source: dataSourceId,
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#2a2859", // default color, blue-dark, but we can't use classes here :(
            50, // 50+ items
            "#2a2859", // 50+ items color, blue-dark
            150, // 150+ items
            "#2a2859", // 150+ items color, blue-dark
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20, // default size
            50, // 50+ items
            30, // 50+ items size
            150, // 150+ items
            40, // 150+ items size
          ],
        },
      });
      map.addLayer({
        id: layerId + "-count",
        type: "symbol",
        source: dataSourceId,
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Oslo Sans", "Arial"],
          "text-size": 16,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      window.maps[map._mapId]["layerIds"].push(layerId + "-count");

      map.addLayer({
        id: layerId + "-unclustered-points",
        type: "symbol",
        source: dataSourceId,
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": "location-pin-filled",
          "icon-allow-overlap": true,
        },
      });

      window.maps[map._mapId]["layerIds"].push(layerId + "-unclustered-points");

      break;
  }
}

// Supports FeatureCollection with Polygon, LineString and Point.
function addGeoJson(map, dataSourceId, geoJsonData, hasPopup = true) {
  map.addSource(dataSourceId, {
    type: "geojson",
    data: geoJsonData,
  });
  window.maps[map._mapId]["dataSourceIds"].push(dataSourceId);

  let polygonsLayerId = dataSourceId + "-polygons";
  let linesLayerId = dataSourceId + "-lines";
  let pointsLayerId = dataSourceId + "-points";

  addLayerType(map, polygonsLayerId, "polygon", dataSourceId);
  addLayerType(map, linesLayerId, "line", dataSourceId);
  addLayerType(map, pointsLayerId, "point", dataSourceId);

  if (hasPopup) {
    addPopupFromMetadata(map, polygonsLayerId);
    addPopupFromMetadata(map, linesLayerId);
    addPopupFromMetadata(map, pointsLayerId);
  }
}

// Supports FeatureCollection with Polygon, LineString and Point.
function addClusteredGeoJson(map, dataSourceId, geoJsonData, hasPopup = true) {
  // Polygons and lines are ignored when clustering.
  // We need to add a separate dataset with all the features, and just draw the ignored shapes in a different layer.

  let shapeDataSourceId = dataSourceId + "-shapes";

  let polygonsLayerId = dataSourceId + "-polygons";
  let linesLayerId = dataSourceId + "-lines";
  let clusterLayerId = dataSourceId + "-cluster";

  map.addSource(dataSourceId, {
    type: "geojson",
    data: geoJsonData,
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50,
  });

  map.addSource(shapeDataSourceId, {
    type: "geojson",
    data: geoJsonData,
  });

  window.maps[map._mapId]["dataSourceIds"].push(dataSourceId);
  window.maps[map._mapId]["dataSourceIds"].push(shapeDataSourceId);

  // Add shapes first
  addLayerType(map, polygonsLayerId, "polygon", shapeDataSourceId);
  addLayerType(map, linesLayerId, "line", shapeDataSourceId);

  // Then points/markers.
  addLayerType(map, clusterLayerId, "cluster", dataSourceId);

  // Expand/zoom in on the cluster on click
  map.on("click", clusterLayerId, function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: [clusterLayerId],
    });
    var clusterId = features[0].properties.cluster_id;
    map.getSource(dataSourceId).getClusterExpansionZoom(clusterId, function (err, zoom) {
      if (err) return;
      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom,
      });
    });
  });

  if (hasPopup) {
    addPopupFromMetadata(map, clusterLayerId + "-unclustered-points");
    addPopupFromMetadata(map, polygonsLayerId);
    addPopupFromMetadata(map, linesLayerId);
  }
}

function clearMap(map) {
  window.maps[map._mapId]["layerIds"].forEach(function (element) {
    if (map.getLayer(element)) {
      map.removeLayer(element);
    }
  });
  window.maps[map._mapId]["layerIds"] = [];

  window.maps[map._mapId]["dataSourceIds"].forEach(function (element) {
    if (map.getSource(element)) {
      map.removeSource(element);
    }
  });
  window.maps[map._mapId]["dataSourceIds"] = [];
}

document.addEventListener("DOMContentLoaded", function () {
  let mapApiKey = "VW1Tn0fx1t3b6t0CHP6Q";

  const mapDiv = document.getElementById("osg-map");
  if (mapDiv) {
    let map = getNewMapObject(10.74981, 59.913008, 12.0, "osg-map", mapApiKey);

    map.on("load", function () {
      let point = {
        heading: "Heading",
        desc: "Description",
        latitude: 10.74981,
        longitude: 59.913008,
      };

      /*
      let points = [
        {
          heading: "Other heading",
          desc: "Other description",
          latitude: 10.74981,
          longitude: 59.923008,
        },
        {
          latitude: 10.74981,
          longitude: 59.910008,
        },
      ];
      */

      addPoint(map, "one", point, true);
      // addPoints(map, "multiple", points, true);
    });
  }

  const mapDiv2 = document.getElementById("osg-map2");
  if (mapDiv2) {
    let map = getNewMapObject(10.74981, 59.913008, 10.0, "osg-map2", mapApiKey);
    map.addControl(new maplibregl.FullscreenControl({ container: document.querySelector("osg-map2") }));
    map.on("load", function () {
      addClusteredGeoJson(map, "kindergartens", "https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/kindergarten.geojson");
    });
  }

  const mapDiv3 = document.getElementById("osg-map3");
  if (mapDiv3) {
    let map = getNewMapObject(10.7434, 59.9185, 13.0, "osg-map3", mapApiKey);
    map.on("load", function () {
      addGeoJson(map, "different-shapes", "https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/featurecollection.geojson");
    });
  }

  const mapDiv4 = document.getElementById("osg-map4");
  if (mapDiv4) {
    let map = getNewMapObject(10.7434, 59.9185, 10.0, "osg-map4", mapApiKey);
    map.addControl(new maplibregl.FullscreenControl({ container: document.querySelector("osg-map4") }));
    map.on("load", function () {
      addGeoJson(map, "dieselforbud", "https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/dieselforbud.geojson");
    });
  }
});
