<template>
  <div class="osg-map__container" ref="mapContainer"></div>
</template>

<script>
import maplibregl from "maplibre-gl";

export default {
  name: "OsgMap",

  props: {
    mapStyle: {
      type: String,
      default: "https://api.maptiler.com/maps/ef955669-6ec4-4320-b5c3-bb2e0732700f/style.json",
    },
    apiKey: {
      type: String,
      default: "VW1Tn0fx1t3b6t0CHP6Q",
    },
    locale: {
      type: Object,
      default: function () {
        return {
          "FullscreenControl.Enter": "Vis i fullskjerm",
          "FullscreenControl.Exit": "Gå ut av fullskjermsvisning",
          "NavigationControl.ZoomIn": "Zoom inn",
          "NavigationControl.ZoomOut": "Zoom ut",
        };
      },
    },
    initialState: {
      type: Object,
      default: function () {
        return {
          longitude: 10.74981,
          latitude: 59.913008,
          zoom: 12,
          showPopups: true,
        };
      },
    },
    initialGeoJson: {
      // Can't set type, as MapLibre accepts both an URL and an object
      default: null,
    },
    initialClusteredGeoJson: {
      // Can't set type, as MapLibre accepts both an URL and an object
      default: null,
    },
    initialPoints: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      layerIds: [],
      dataSourceIds: [],
      mapObject: null,
      geoJson: null,
      clusteredGeoJson: null,
      pointsGeoJson: null,
      mapReady: false,
      showPopups: true,
    };
  },

  mounted() {
    this.mapObject = new maplibregl.Map({
      container: this.$refs.mapContainer,
      style: this.mapStyle + "?key=" + this.apiKey,
      locale: this.locale,
      center: [this.initialState.longitude, this.initialState.latitude],
      zoom: this.initialState.zoom,
      dragRotate: false,
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

    this.mapObject.addControl(nav, "top-left");
    this.mapObject.addControl(scale);
    this.mapObject.scrollZoom.disable();

    this.showPopups = this.initialState.showPopups;

    if (this.initialPoints) {
      this.setPoints(this.initialPoints);
    }

    if (this.initialGeoJson) {
      this.setGeoJson(this.initialGeoJson);
    }

    if (this.initialClusteredGeoJson) {
      this.setClusteredGeoJson(this.initialClusteredGeoJson);
    }

    var _this = this; // Scope this, bobby!

    this.mapObject.loadImage("https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/location-pin-filled.png", function (error, image) {
      if (error) throw error;
      _this.mapObject.addImage("location-pin-filled", image);
    });

    this.mapObject.on("load", function () {
      _this.mapReady = true;

      // If there is data available, show it now plz.
      _this.populateMap();
      // Popups.
    });
  },

  methods: {
    populateMap: function () {
      // Will only populate if map is ready (load event done)
      if (this.mapReady) {
        if (this.pointsGeoJson !== null) {
          // @todo: litt feilhåndtering???

          this.mapObject.addSource("points", {
            type: "geojson",
            data: this.pointsGeoJson,
          });
          this.dataSourceIds.push("points");
          this.$_addPointsLayer("points", "points");

          if (this.showPopups) {
            this.$_addPopupsFromProperties("points");
          }
        }

        if (this.geoJson !== null) {
          this.mapObject.addSource("geoJson", {
            type: "geojson",
            data: this.geoJson,
          });

          this.dataSourceIds.push("geoJson");
          this.$_addPolygonsLayer("geoJson-polygons", "geoJson");
          this.$_addLinesLayer("geoJson-lines", "geoJson");
          this.$_addPointsLayer("geoJson-points", "geoJson");

          if (this.showPopups) {
            this.$_addPopupsFromProperties("geoJson-polygons");
            this.$_addPopupsFromProperties("geoJson-lines");
            this.$_addPopupsFromProperties("geoJson-points");
          }
        }

        if (this.clusteredGeoJson !== null) {
          this.mapObject.addSource("clusteredGeoJson", {
            type: "geojson",
            data: this.clusteredGeoJson,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50,
          });

          this.mapObject.addSource("clusteredGeoJson-shapes", {
            type: "geojson",
            data: this.clusteredGeoJson,
          });

          this.dataSourceIds.push("clusteredGeoJson");
          this.dataSourceIds.push("clusteredGeoJson-shapes");

          // Add shapes first
          this.$_addPolygonsLayer("clusteredGeoJson-shapes-polygons", "clusteredGeoJson-shapes");
          this.$_addLinesLayer("clusteredGeoJson-shapes-lines", "clusteredGeoJson-shapes");

          // Then points/markers.
          this.$_addClusterLayer("clusteredGeoJson-points", "clusteredGeoJson");

          // Expand/zoom in on the cluster on click
          var _this = this; // Scope this, bobby!
          this.mapObject.on("click", "clusteredGeoJson-points", function (e) {
            var features = _this.mapObject.queryRenderedFeatures(e.point, {
              layers: ["clusteredGeoJson-points"],
            });
            var clusterId = features[0].properties.cluster_id;
            _this.mapObject.getSource("clusteredGeoJson").getClusterExpansionZoom(clusterId, function (err, zoom) {
              if (err) return;
              _this.mapObject.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
          });

          if (this.showPopups) {
            this.$_addPopupsFromProperties("clusteredGeoJson-points-unclustered-points");
            this.$_addPopupsFromProperties("clusteredGeoJson-shapes-polygons");
            this.$_addPopupsFromProperties("clusteredGeoJson-shapes-lines");
          }
        }
      }
    },
    setPoints(points) {
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

      this.pointsGeoJson = {
        type: "FeatureCollection",
        features: features,
      };
    },
    setGeoJson(geoJson) {
      // GeoJson can be an actual object or an URL
      this.geoJson = geoJson;
    },
    setClusteredGeoJson(geoJson) {
      // GeoJson can be an actual object or an URL
      this.clusteredGeoJson = geoJson;
    },
    clearMapAndData() {
      var _this = this; // Scope this, bobby!

      this.layerIds.forEach(function (element) {
        if (_this.mapObject.getLayer(element)) {
          _this.mapObject.removeLayer(element);
        }
      });

      this.dataSourceIds.forEach(function (element) {
        if (_this.mapObject.getSource(element)) {
          _this.mapObject.removeSource(element);
        }
      });

      this.layerIds = [];
      this.dataSourceIds = [];

      this.pointsGeoJson = null;
      this.clusteredGeoJson = null;
      this.geoJson = null;
    },
    // Private/protected method
    $_addPolygonsLayer(layerId, dataSourceId) {
      // Adds fill + line to get an outline / stroke on the polygon.

      let layerIdOutline = layerId + "-outline";
      this.layerIds.push(layerId);
      this.layerIds.push(layerIdOutline);

      this.mapObject.addLayer({
        id: layerId,
        type: "fill",
        source: dataSourceId,
        paint: {
          // Only hex codes and base HTML color name are supported, therefore we can't use the grayscale-*-colors here.
          "fill-color": [
            "case",
            ["==", ["get", "highlight"], true],
            "#6fe9ff", // Blue
            "#2a2859", // Default, blue-dark
          ],
          "fill-opacity": [
            "case",
            ["==", ["get", "highlight"], true],
            0.5,
            0.1, // Default
          ],
        },
        filter: ["==", "$type", "Polygon"],
      });

      this.mapObject.addLayer({
        id: layerIdOutline,
        type: "line",
        source: dataSourceId,
        paint: {
          // Only hex codes and base HTML color name are supported, therefore we can't use the grayscale-*-colors here.
          "line-color": [
            "case",
            ["==", ["get", "color"], "highlight"],
            "#6fe9ff", // Blue
            "#2a2859", // Default, blue-dark
          ],
          "line-width": 2,
        },
        filter: ["==", "$type", "Polygon"],
      });
    },
    // Private/protected method
    $_addLinesLayer(layerId, dataSourceId) {
      this.layerIds.push(layerId);

      this.mapObject.addLayer({
        id: layerId,
        type: "line",
        source: dataSourceId,
        paint: {
          // Only hex codes and base HTML color name are supported, therefore we can't use the grayscale-*-colors here.
          "line-color": "#ff8274", // Red
          "line-width": 2,
        },
        filter: ["==", "$type", "LineString"],
      });
    },
    // Private/protected method
    $_addPointsLayer(layerId, dataSourceId) {
      this.layerIds.push(layerId);

      this.mapObject.addLayer({
        id: layerId,
        type: "symbol",
        source: dataSourceId,
        layout: {
          "icon-image": "location-pin-filled",
          "icon-allow-overlap": true,
        },
        filter: ["==", "$type", "Point"],
      });
    },
    // Private/protected method
    $_addClusterLayer(layerId, dataSourceId) {
      // A cluster is made up of three layers. One for the circles, one for the number/count and one for the points that are not in a cluster.

      let layerIdCount = layerId + "-count";
      let layerIdUnclusteredPoints = layerId + "-unclustered-points";

      this.layerIds.push(layerId);
      this.layerIds.push(layerIdCount);
      this.layerIds.push(layerIdUnclusteredPoints);

      this.mapObject.addLayer({
        id: layerId,
        type: "circle",
        source: dataSourceId,
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#2a2859", // default color, blue-dark, but we can't use classes here :( @todo: DRY color codes.
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
      this.mapObject.addLayer({
        id: layerIdCount,
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

      this.mapObject.addLayer({
        id: layerIdUnclusteredPoints,
        type: "symbol",
        source: dataSourceId,
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": "location-pin-filled",
          "icon-allow-overlap": true,
        },
      });
    },
    // Private/protected method
    $_addPopupsFromProperties(layerId) {
      var _this = this; // Scope this, bobby!

      // When a click event occurs on a feature in the layer, open a popup at the
      // location of the feature, with HTML generated from its properties.
      this.mapObject.on("click", layerId, function (event) {
        let heading = event.features[0].properties.heading ?? "";
        let description = event.features[0].properties.description ?? "";
        if (description.length === 0) {
          description = event.features[0].properties.desc ?? "";
        }

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
            .addTo(_this.mapObject);
        }
      });

      // Change the cursor to a pointer when over the feature/layer.
      this.mapObject.on("mouseenter", layerId, function () {
        _this.mapObject.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      this.mapObject.on("mouseleave", layerId, function () {
        _this.mapObject.getCanvas().style.cursor = "";
      });
    },
  },
};
</script>
