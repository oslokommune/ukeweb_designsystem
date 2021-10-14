window.maps = [];

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

import OsgMap from "./map.vue";

document.addEventListener("DOMContentLoaded", function () {
  let mapElement = document.getElementById("osg-map");
  let mapElement2 = document.getElementById("osg-map2");

  if (mapElement) {
    Vue.component("osg-map", OsgMap);
    var app = new Vue({ el: mapElement });
  }

  if (mapElement2) {
    Vue.component("osg-map", OsgMap);
    var app2 = new Vue({ el: mapElement2 });

    app2.$refs.osgMap2.setClusteredGeoJson("https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/kindergarten.geojson");
    app2.$refs.osgMap2.populateMap();
  }
});
