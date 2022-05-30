<template>
  <div>
    <div class="osg-map__container" ref="mapContainer"></div>
    <div v-show="error" class="osg-status-message osg-status-message--warning" aria-live="polite">{{ i18n.mapError }} - {{ technicalErrorText }}</div>
  </div>
</template>

<script>
import maplibregl from "maplibre-gl";

export default {
  name: "OsgMap",

  props: {
    mapStyle: {
      type: String,
      default: "https://api.maptiler.com/maps/79adf164-6825-4f19-8239-52582627143a/style.json",
    },
    apiKey: {
      type: String,
      default: "l4ZxSXKkrA16jgVeYWUE",
    },
    i18n: {
      type: Object,
      default: () => {
        return {
          mapLibre: {
            "FullscreenControl.Enter": "Vis i fullskjerm",
            "FullscreenControl.Exit": "Gå ut av fullskjermsvisning",
            "NavigationControl.ZoomIn": "Zoom inn",
            "NavigationControl.ZoomOut": "Zoom ut",
          },
          mapError: "En feil oppstod ved lasting av kart.",
        };
      },
    },
    state: {
      type: Object,
      default: () => {
        return {
          longitude: 10.74981,
          latitude: 59.913008,
          zoom: 12,
          showPopups: true,
          autoFitToBounds: true,
        };
      },
    },
    geoJson: {
      // Can't set type, as MapLibre accepts both an URL and an object
      default: null,
    },
    points: {
      type: Array,
      default: null,
    },
    clusteredPoints: {
      type: Boolean,
      default: false,
    },
    loadMap: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    layerIds: [],
    dataSourceIds: [],
    lastDisplayedPopup: null,
    mapObject: null,
    mapReady: false,
    showPopups: true,
    mapLoaded: false,
    error: false,
    technicalErrorText: "",
  }),

  computed: {
    pointsGeoJson() {
      if (this.points) {
        let features = [];
        this.points.forEach((point) => {
          let heading = point.heading ?? "";
          let description = point.description ?? "";
          if (description.length === 0) {
            description = point.desc ?? "";
          }
          let openPopup = point.openPopup ?? false;

          features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [point.longitude, point.latitude],
            },
            properties: {
              heading: heading,
              description: description,
              openPopup: openPopup,
            },
          });
        });

        return {
          type: "FeatureCollection",
          features: features,
        };
      }
      return null;
    },
  },

  mounted() {
    if (this.loadMap) {
      this.mapLoad();
    }
  },

  watch: {
    loadMap: {
      handler(newValue) {
        if (newValue) {
          this.mapLoad();
        }
      },
    },
    pointsGeoJson: {
      deep: true,
      handler() {
        if (this.loadMap === true) {
          this.clearMapAndData();
          this.populateMap();
        }
      },
    },
    geoJson: {
      deep: true,
      handler() {
        if (this.loadMap === true) {
          this.clearMapAndData();
          this.populateMap();
        }
      },
    },
    state: {
      deep: true,
      handler() {
        if (this.loadMap === true) {
          this.mapObject.setCenter([this.state.longitude, this.state.latitude]);
          this.mapObject.setZoom(this.state.zoom);
          if (this.state.showPopups !== this.showPopups) {
            this.showPopups = this.state.showPopups;
            this.clearMapAndData();
            this.populateMap();
          }
        }
      },
    },
  },

  methods: {
    mapLoad() {
      if (!this.mapLoaded) {
        this.mapLoaded = true;
        if (typeof this.geoJson === "string") {
          fetch(this.geoJson)
            .then((response) => response.json())
            .then((data) => {
              this.$_createMapObject(data);
            });
        } else {
          this.$_createMapObject(this.geoJson);
        }
      }
    },
    populateMap() {
      // Will only populate if map is ready (load event done)
      if (this.mapReady) {
        if (this.pointsGeoJson !== null) {
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
          if (!this.clusteredPoints) {
            if (typeof this.geoJson === "string") {
              fetch(this.geoJson)
                .then((response) => response.json())
                .then((data) => {
                  this.$_addGeoJsonToMap(data);
                });
            } else {
              this.$_addGeoJsonToMap(this.geoJson);
            }
          } else {
            if (typeof this.geoJson === "string") {
              fetch(this.geoJson)
                .then((response) => response.json())
                .then((data) => {
                  this.$_splitClusterDataAndAddToMap(data);
                });
            } else {
              this.$_splitClusterDataAndAddToMap(this.geoJson);
            }
          }
        }
      }
    },
    clearMapAndData() {
      if (this.lastDisplayedPopup !== null) {
        this.lastDisplayedPopup.remove();
      }

      this.layerIds.forEach((layerId) => {
        if (this.mapObject.getLayer(layerId)) {
          this.mapObject.removeLayer(layerId);
        }
      });

      this.dataSourceIds.forEach((dataSourceId) => {
        if (this.mapObject.getSource(dataSourceId)) {
          this.mapObject.removeSource(dataSourceId);
        }
      });

      this.layerIds = [];
      this.dataSourceIds = [];
    },
    getBoundingBox(geoJson) {
      if (!this.state.autoFitToBounds) {
        return;
      }

      if (!geoJson.hasOwnProperty("type")) {
        return;
      }

      let coordinates, boundingBox;

      coordinates = this.$_getCoordinatesForGeoJsonObject(geoJson);
      boundingBox = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
      return coordinates.reduce((previous, coordinate) => {
        return [Math.min(coordinate[0], previous[0]), Math.min(coordinate[1], previous[1]), Math.max(coordinate[0], previous[2]), Math.max(coordinate[1], previous[3])];
      }, boundingBox);
    },
    setBoundingBox(boundingBox) {
      if (boundingBox) {
        this.mapObject.fitBounds(boundingBox, {
          padding: 30,
          maxZoom: 16,
        });
      }
    },
    // Private/protected method
    $_createMapObject(geoJson) {
      let mapConfig = {
        container: this.$refs.mapContainer,
        style: this.mapStyle + "?key=" + this.apiKey,
        locale: this.i18n.mapLibre,
        dragRotate: false,
      };

      if (geoJson && this.state.autoFitToBounds) {
        let boundingBox = this.getBoundingBox(geoJson);
        if (boundingBox) {
          mapConfig = {
            ...mapConfig,
            ...{
              bounds: boundingBox,
              fitBoundsOptions: {
                padding: 30,
                maxZoom: 16,
              },
            },
          };
        }
      } else {
        mapConfig = {
          ...mapConfig,
          ...{
            center: [this.state.longitude, this.state.latitude],
            zoom: this.state.zoom,
          },
        };
      }

      this.mapObject = new maplibregl.Map(mapConfig);

      this.mapObject.on("error", (event) => {
        this.error = true;
        this.technicalErrorText = event.error.message;
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

      this.showPopups = this.state.showPopups;

      this.mapObject.loadImage("https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/location-pin-filled.png", (error, image) => {
        if (error) throw error;
        this.mapObject.addImage("location-pin-filled", image);
      });

      this.mapObject.on("load", () => {
        this.mapReady = true;

        // If there is data available, show it now plz.
        this.populateMap();
      });
    },
    // Private/protected method
    $_getCoordinatesForGeoJsonObject(geoJson) {
      let coordinates;
      if (geoJson.type === "Point") {
        coordinates = [geoJson.coordinates];
      } else if (geoJson.type === "LineString" || geoJson.type === "MultiPoint") {
        coordinates = geoJson.coordinates;
      } else if (geoJson.type === "Polygon" || geoJson.type === "MultiLineString") {
        coordinates = geoJson.coordinates.reduce((part, partialLine) => {
          return part.concat(partialLine);
        }, []);
      } else if (geoJson.type === "MultiPolygon") {
        coordinates = geoJson.coordinates.reduce((part, polygon) => {
          return part.concat(
            polygon.reduce((points, point) => {
              return points.concat(point);
            }, [])
          );
        }, []);
      } else if (geoJson.type === "Feature") {
        coordinates = this.$_getCoordinatesForGeoJsonObject(geoJson.geometry);
      } else if (geoJson.type === "GeometryCollection") {
        var _this = this; // Scope this, bobby!
        coordinates = geoJson.geometries.reduce((part, geometryCollection) => {
          return part.concat(_this.$_getCoordinatesForGeoJsonObject(geometryCollection));
        }, []);
      } else if (geoJson.type === "FeatureCollection") {
        var _this = this; // Scope this, bobby!
        coordinates = geoJson.features.reduce((part, featureCollection) => {
          return part.concat(_this.$_getCoordinatesForGeoJsonObject(featureCollection));
        }, []);
      }
      return coordinates;
    },
    // Private/protected method
    $_addGeoJsonToMap(geoJson) {
      let boundingBox = this.getBoundingBox(geoJson);
      if (boundingBox) {
        this.setBoundingBox(boundingBox);
      }
      this.mapObject.addSource("geoJson", {
        type: "geojson",
        data: geoJson,
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
    },
    // Private/protected method
    $_splitClusterDataAndAddToMap(geoJson) {
      let boundingBox = this.getBoundingBox(geoJson);
      if (boundingBox) {
        this.setBoundingBox(boundingBox);
      }

      // Large data sets fails without and error message when points and other shapes are mixed in the same data source.
      // Therefore we split points and features into two separate data sets.
      let points = {
        type: "FeatureCollection",
        features: [],
      };
      let shapes = {
        type: "FeatureCollection",
        features: [],
      };

      geoJson.features.forEach((feature) => {
        if (feature.geometry.type === "Point") {
          points.features.push(feature);
        } else {
          shapes.features.push(feature);
        }
      });

      this.mapObject.addSource("clusteredGeoJson", {
        type: "geojson",
        data: points,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50,
      });

      this.mapObject.addSource("clusteredGeoJson-shapes", {
        type: "geojson",
        data: shapes,
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
      this.mapObject.on("click", "clusteredGeoJson-points", (event) => {
        var features = _this.mapObject.queryRenderedFeatures(event.point, {
          layers: ["clusteredGeoJson-points"],
        });
        var clusterId = features[0].properties.cluster_id;
        _this.mapObject.getSource("clusteredGeoJson").getClusterExpansionZoom(clusterId, (err, zoom) => {
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
    },
    // Private/protected method
    $_addPolygonsLayer(layerId, dataSourceId) {
      this.$_openPopupAfterDataLoaded(dataSourceId);

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
            "#6fe9ff", // Highlight color, blue
            "#2a2859", // Default, blue-dark
          ],
          "fill-opacity": [
            "case",
            ["==", ["get", "highlight"], true],
            0.5, // Highlight opacity
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
            ["==", ["get", "highlight"], true],
            "#2a2859", // Highlight color, blue-dark, same as default for now.
            "#2a2859", // Default, blue-dark
          ],
          "line-width": 2,
        },
        filter: ["==", "$type", "Polygon"],
      });
    },
    // Private/protected method
    $_addLinesLayer(layerId, dataSourceId) {
      this.$_openPopupAfterDataLoaded(dataSourceId);

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
      this.$_openPopupAfterDataLoaded(dataSourceId);

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
      this.mapObject.on("click", layerId, (event) => {
        let html = _this.$_getPopupHtml(event.features[0]);

        if (typeof html === "string") {
          const popup = new maplibregl.Popup({ className: "osg-map__popup" }).setLngLat(event.lngLat).setHTML(html).addTo(_this.mapObject);
          this.lastDisplayedPopup = popup;
        }
      });

      // Change the cursor to a pointer when over the feature/layer.
      this.mapObject.on("mouseenter", layerId, () => {
        _this.mapObject.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      this.mapObject.on("mouseleave", layerId, () => {
        _this.mapObject.getCanvas().style.cursor = "";
      });
    },
    // Private/protected method
    $_getPopupHtml(feature) {
      let heading = feature.properties.heading ?? "";
      let description = feature.properties.description ?? "";
      if (description.length === 0) {
        description = feature.properties.desc ?? "";
      }

      let additionalData = feature.properties.data ? JSON.parse(feature.properties.data) : [];
      let additionalDataHtml = "";

      if (heading.length > 0) {
        heading = "<h3 class='osg-map__heading'>" + heading + "</h3>";
      }

      // Need a better way to handle this in the future.
      if (description === "null") {
        description = "";
      }

      if (additionalData.length > 0) {
        additionalData.forEach((data) => {
          let label = data.label ?? "";
          let value = data.value ?? "";

          if (label.length > 0 && value.length > 0) {
            additionalDataHtml = additionalDataHtml + "<span class='osg-map__label'>" + label + "</span>: <span class='osg-map__value'>" + value + "</span><br>";
          }
        });
      }

      if (heading.length > 0 || description.length > 0) {
        return "<div class='osg-map__popup-content'>" + heading + description + additionalDataHtml + "</div>";
      }

      return null;
    },
    // Private/protected method
    $_openPopupAfterDataLoaded(dataSourceId) {
      if (this.showPopups && this.clusteredPoints === false) {
        this.mapObject.on("sourcedata", (event) => {
          // https://maplibre.org/maplibre-gl-js-docs/api/events/#mapdataevent
          if (event.isSourceLoaded && event.sourceId === dataSourceId && event.coord) {
            let features = event.source.data.features;
            if (typeof features === "object") {
              features.forEach((feature) => {
                if (feature.properties.openPopup) {
                  new maplibregl.Popup().setLngLat(feature.geometry.coordinates).setHTML(this.$_getPopupHtml(feature)).addTo(this.mapObject);
                }
              });
            }
          }
        });
      }
    },
  },
};
</script>
