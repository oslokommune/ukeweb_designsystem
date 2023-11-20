<template>
  <div>
    <div class="ods-map__container" :class="ratio ? ratio : ''" ref="mapContainer"></div>
    <div v-show="error" class="ods-status-message ods-status-message--warning" aria-live="polite">
      <h2 class="ods-status-message__heading"><span class="ods-status-message__icon ods-icon--error-hexa" aria-hidden="true"></span>{{ i18n.mapError }} - {{ technicalErrorText }}</h2>
    </div>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl';
import dispatchCustomEvent from '../../utils/js/events/dispatchCustomEvent';

export default {
  name: 'OdsMap',

  props: {
    mapStyle: {
      type: String,
      default: 'https://api.maptiler.com/maps/79adf164-6825-4f19-8239-52582627143a/style.json',
    },
    apiKey: {
      type: String,
      default: 'l4ZxSXKkrA16jgVeYWUE',
    },
    i18n: {
      type: Object,
      default: () => ({
        mapLibre: {
          'FullscreenControl.Enter': 'Vis i fullskjerm',
          'FullscreenControl.Exit': 'Gå ut av fullskjermsvisning',
          'NavigationControl.ZoomIn': 'Zoom inn',
          'NavigationControl.ZoomOut': 'Zoom ut',
        },
        mapError: 'En feil oppstod ved lasting av kart.',
      }),
    },
    state: {
      type: Object,
      default: () => ({
        longitude: 10.74981,
        latitude: 59.913008,
        zoom: 12,
        showPopups: true,
        autoFitToBounds: true,
      }),
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
    ratio: {
      type: String,
      default: 'ods-ratio-16-9',
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
    technicalErrorText: '',
  }),

  computed: {
    pointsGeoJson() {
      if (this.points) {
        const features = [];
        this.points.forEach((point) => {
          features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [point.longitude, point.latitude],
            },
            properties: {
              popupContent: point.popupContent ?? '',
              openPopup: point.openPopup ?? false,
            },
          });
        });

        return {
          type: 'FeatureCollection',
          features,
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
        if (typeof this.geoJson === 'string') {
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
          this.mapObject.addSource('points', {
            type: 'geojson',
            data: this.pointsGeoJson,
          });
          this.dataSourceIds.push('points');
          this.$_addPointsLayer('points', 'points');

          if (this.showPopups) {
            this.$_addPopupsFromProperties('points');
          }
        }

        if (this.geoJson !== null) {
          if (!this.clusteredPoints) {
            if (typeof this.geoJson === 'string') {
              fetch(this.geoJson)
                .then((response) => response.json())
                .then((data) => {
                  this.$_addGeoJsonToMap(data);
                });
            } else {
              this.$_addGeoJsonToMap(this.geoJson);
            }
          } else if (typeof this.geoJson === 'string') {
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
    },
    clearMapAndData() {
      if (this.lastDisplayedPopup !== null) {
        this.lastDisplayedPopup.remove();
      }

      this.layerIds.forEach((layerId) => {
        // Remove previously added listeners
        // Listener for click events that occurs on a feature in the layer.
        this.mapObject.off('click', layerId, this.$_addClickEventToLayer);

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
      if (!this.state.autoFitToBounds || !Object.prototype.hasOwnProperty.call(geoJson, 'type')) {
        return null;
      }

      const coordinates = this.$_getCoordinatesForGeoJsonObject(geoJson);
      const boundingBox = this.calculateBoundingBox(coordinates);

      return boundingBox || null;
    },

    calculateBoundingBox(coordinates) {
      const initialBox = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];

      return coordinates.reduce((previous, coordinate) => [Math.min(coordinate[0], previous[0]), Math.min(coordinate[1], previous[1]), Math.max(coordinate[0], previous[2]), Math.max(coordinate[1], previous[3])], initialBox);
    },
    setBoundingBox(boundingBox) {
      if (boundingBox) {
        this.mapObject.fitBounds(boundingBox, {
          padding: 30,
          maxZoom: 16,
        });
      }
    },

    resize() {
      this.mapObject.resize();
      this.$emit('resize');
    },

    // Private/protected method
    $_createMapObject(geoJson) {
      let mapConfig = {
        container: this.$refs.mapContainer,
        style: `${this.mapStyle}?key=${this.apiKey}`,
        locale: this.i18n.mapLibre,
        dragRotate: false,
      };

      if (geoJson && this.state.autoFitToBounds) {
        const boundingBox = this.getBoundingBox(geoJson);
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

      this.mapObject.on('error', (event) => {
        this.error = true;
        this.technicalErrorText = event.error.message;
      });

      const nav = new maplibregl.NavigationControl({
        showCompass: false,
      });

      const scale = new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: 'metric',
      });

      this.mapObject.addControl(nav, 'top-left');
      this.mapObject.addControl(scale);
      this.mapObject.scrollZoom.disable();

      this.showPopups = this.state.showPopups;

      this.mapObject.loadImage('https://ukeweb-public.s3.dualstack.eu-central-1.amazonaws.com/map/location-pin-filled.png', (error, image) => {
        if (error) throw error;
        this.mapObject.addImage('location-pin-filled', image);
      });

      this.mapObject.on('load', () => {
        this.mapReady = true;
        this.resize();

        // If there is data available, show it now plz.
        this.populateMap();
      });
    },
    // Private/protected method
    $_getCoordinatesForGeoJsonObject(geoJson) {
      let coordinates;
      if (geoJson.type === 'Point') {
        coordinates = [geoJson.coordinates];
      } else if (geoJson.type === 'LineString' || geoJson.type === 'MultiPoint') {
        coordinates = geoJson.coordinates;
      } else if (geoJson.type === 'Polygon' || geoJson.type === 'MultiLineString') {
        coordinates = geoJson.coordinates.reduce((part, partialLine) => part.concat(partialLine), []);
      } else if (geoJson.type === 'MultiPolygon') {
        coordinates = geoJson.coordinates.reduce((part, polygon) => part.concat(polygon.reduce((points, point) => points.concat(point), [])), []);
      } else if (geoJson.type === 'Feature') {
        coordinates = this.$_getCoordinatesForGeoJsonObject(geoJson.geometry);
      } else if (geoJson.type === 'GeometryCollection') {
        const outerThis = this; // Scope this, bobby!
        coordinates = geoJson.geometries.reduce((part, geometryCollection) => part.concat(outerThis.$_getCoordinatesForGeoJsonObject(geometryCollection)), []);
      } else if (geoJson.type === 'FeatureCollection') {
        const outerThis = this; // Scope this, bobby!
        coordinates = geoJson.features.reduce((part, featureCollection) => part.concat(outerThis.$_getCoordinatesForGeoJsonObject(featureCollection)), []);
      }
      return coordinates;
    },
    // Private/protected method
    $_addGeoJsonToMap(geoJson) {
      const boundingBox = this.getBoundingBox(geoJson);
      if (boundingBox) {
        this.setBoundingBox(boundingBox);
      }
      this.mapObject.addSource('geoJson', {
        type: 'geojson',
        data: geoJson,
      });

      this.dataSourceIds.push('geoJson');
      this.$_addPolygonsLayer('geoJson-polygons', 'geoJson');
      this.$_addLinesLayer('geoJson-lines', 'geoJson');
      this.$_addPointsLayer('geoJson-points', 'geoJson');

      if (this.showPopups) {
        this.$_addPopupsFromProperties('geoJson-polygons');
        this.$_addPopupsFromProperties('geoJson-lines');
        this.$_addPopupsFromProperties('geoJson-points');
      }
    },
    // Private/protected method
    $_splitClusterDataAndAddToMap(geoJson) {
      const boundingBox = this.getBoundingBox(geoJson);
      if (boundingBox) {
        this.setBoundingBox(boundingBox);
      }

      // Large data sets fails without and error message when points and other shapes are mixed in the same data source.
      // Therefore we split points and features into two separate data sets.
      const points = {
        type: 'FeatureCollection',
        features: [],
      };
      const shapes = {
        type: 'FeatureCollection',
        features: [],
      };

      geoJson.features.forEach((feature) => {
        if (feature.geometry.type === 'Point') {
          points.features.push(feature);
        } else {
          shapes.features.push(feature);
        }
      });

      this.mapObject.addSource('clusteredGeoJson', {
        type: 'geojson',
        data: points,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50,
      });

      this.mapObject.addSource('clusteredGeoJson-shapes', {
        type: 'geojson',
        data: shapes,
      });

      this.dataSourceIds.push('clusteredGeoJson');
      this.dataSourceIds.push('clusteredGeoJson-shapes');

      // Add shapes first
      this.$_addPolygonsLayer('clusteredGeoJson-shapes-polygons', 'clusteredGeoJson-shapes');
      this.$_addLinesLayer('clusteredGeoJson-shapes-lines', 'clusteredGeoJson-shapes');

      // Then points/markers.
      this.$_addClusterLayer('clusteredGeoJson-points', 'clusteredGeoJson');

      // Expand/zoom in on the cluster on click
      this.mapObject.on('click', 'clusteredGeoJson-points', (event) => {
        const features = this.mapObject.queryRenderedFeatures(event.point, {
          layers: ['clusteredGeoJson-points'],
        });
        const clusterId = features[0].properties.cluster_id;
        this.mapObject.getSource('clusteredGeoJson').getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          this.mapObject.easeTo({
            center: features[0].geometry.coordinates,
            zoom,
          });
        });
      });

      if (this.showPopups) {
        this.$_addPopupsFromProperties('clusteredGeoJson-points-unclustered-points');
        this.$_addPopupsFromProperties('clusteredGeoJson-shapes-polygons');
        this.$_addPopupsFromProperties('clusteredGeoJson-shapes-lines');
      }
    },
    // Private/protected method
    $_addPolygonsLayer(layerId, dataSourceId) {
      this.$_openPopupAfterDataLoaded(dataSourceId);

      // Adds fill + line to get an outline / stroke on the polygon.

      const layerIdOutline = `${layerId}-outline`;
      this.layerIds.push(layerId);
      this.layerIds.push(layerIdOutline);

      this.mapObject.addLayer({
        id: layerId,
        type: 'fill',
        source: dataSourceId,
        paint: {
          // Only hex codes and base HTML color name are supported, therefore we can't use the grayscale-*-colors here.
          'fill-color': [
            'case',
            ['==', ['get', 'highlight'], true],
            '#6fe9ff', // Highlight color, blue
            '#2a2859', // Default, blue-dark
          ],
          'fill-opacity': [
            'case',
            ['==', ['get', 'highlight'], true],
            0.5, // Highlight opacity
            0.1, // Default
          ],
        },
        filter: ['==', '$type', 'Polygon'],
      });

      this.mapObject.addLayer({
        id: layerIdOutline,
        type: 'line',
        source: dataSourceId,
        paint: {
          // Only hex codes and base HTML color name are supported, therefore we can't use the grayscale-*-colors here.
          'line-color': [
            'case',
            ['==', ['get', 'highlight'], true],
            '#2a2859', // Highlight color, blue-dark, same as default for now.
            '#2a2859', // Default, blue-dark
          ],
          'line-width': 2,
        },
        filter: ['==', '$type', 'Polygon'],
      });
    },
    // Private/protected method
    $_addLinesLayer(layerId, dataSourceId) {
      this.$_openPopupAfterDataLoaded(dataSourceId);

      this.layerIds.push(layerId);

      this.mapObject.addLayer({
        id: layerId,
        type: 'line',
        source: dataSourceId,
        paint: {
          // Only hex codes and base HTML color name are supported, therefore we can't use the grayscale-*-colors here.
          'line-color': '#ff8274', // Red
          'line-width': 2,
        },
        filter: ['==', '$type', 'LineString'],
      });
    },
    // Private/protected method
    $_addPointsLayer(layerId, dataSourceId) {
      this.$_openPopupAfterDataLoaded(dataSourceId);

      this.layerIds.push(layerId);

      this.mapObject.addLayer({
        id: layerId,
        type: 'symbol',
        source: dataSourceId,
        layout: {
          'icon-image': 'location-pin-filled',
          'icon-overlap': 'always',
          'icon-anchor': 'bottom',
        },
        filter: ['==', '$type', 'Point'],
      });
    },
    // Private/protected method
    $_addClusterLayer(layerId, dataSourceId) {
      // A cluster is made up of three layers. One for the circles, one for the number/count and one for the points that are not in a cluster.

      const layerIdCount = `${layerId}-count`;
      const layerIdUnclusteredPoints = `${layerId}-unclustered-points`;

      this.layerIds.push(layerId);
      this.layerIds.push(layerIdCount);
      this.layerIds.push(layerIdUnclusteredPoints);

      this.mapObject.addLayer({
        id: layerId,
        type: 'circle',
        source: dataSourceId,
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#2a2859', // default color, blue-dark, but we can't use classes here :( @todo: DRY color codes.
            50, // 50+ items
            '#2a2859', // 50+ items color, blue-dark
            150, // 150+ items
            '#2a2859', // 150+ items color, blue-dark
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
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
        type: 'symbol',
        source: dataSourceId,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['Oslo Sans', 'Arial'],
          'text-size': 16,
        },
        paint: {
          'text-color': '#ffffff',
        },
      });

      this.mapObject.addLayer({
        id: layerIdUnclusteredPoints,
        type: 'symbol',
        source: dataSourceId,
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': 'location-pin-filled',
          'icon-overlap': 'always',
        },
      });
    },
    // Private/protected method
    $_addEventsToPopup(popup, properties) {
      if (properties) {
        const popupEvent = properties.popupEvent ?? null;
        const popdownEvent = properties.popdownEvent ?? null;
        let popupEventData = properties.popupEventData ?? null;

        if (popupEventData) {
          // Try to parse event data as JSON if it's a string (probably JSON).
          if (typeof popupEventData === 'string') {
            try {
              popupEventData = JSON.parse(popupEventData);
            } catch (e) {
              // Probably: Uncaught SyntaxError: JSON.parse: unexpected character at line 1 column 2 of the JSON data
              this.technicalErrorText = e.message;
              this.error = true;
            }
          }
        }

        if (popupEvent) {
          popup.on('open', () => {
            // Emit popup event.
            dispatchCustomEvent(popupEvent, { data: popupEventData }, window);
          });
        }

        if (popdownEvent) {
          popup.on('close', () => {
            // Emit popdown event.
            dispatchCustomEvent(popdownEvent, { data: popupEventData }, window);
          });
        }
      }
    },
    // Private/protected method
    $_addPopupToMap(lngLat, feature) {
      const html = this.$_getPopupHtml(feature);
      if (typeof html === 'string') {
        const popup = new maplibregl.Popup({ className: 'ods-map__popup' }).setLngLat(lngLat).setHTML(html);
        const properties = feature.properties ?? null;
        this.$_addEventsToPopup(popup, properties);
        popup.addTo(this.mapObject);
        this.lastDisplayedPopup = popup;
      }
    },
    // Private/protected method
    $_addClickEventToLayer(event) {
      this.$_addPopupToMap(event.lngLat, event.features[0]);
    },

    // Private/protected method
    $_addPopupsFromProperties(layerId) {
      // Add listener for click events that occurs on a feature in the layer, open a popup at the
      // location of the feature, with HTML from its properties.

      this.mapObject.on('click', layerId, this.$_addClickEventToLayer);

      // Change the cursor to a pointer when over the feature/layer.
      this.mapObject.on('mouseenter', layerId, () => {
        this.mapObject.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      this.mapObject.on('mouseleave', layerId, () => {
        this.mapObject.getCanvas().style.cursor = '';
      });
    },
    // Private/protected method
    $_getPopupHtml(feature) {
      const popupContent = feature.properties.popupContent ?? '';

      if (popupContent.length > 0) {
        return `<div class="ods-map__popup-content">${popupContent}</div>`;
      }

      return null;
    },
    // Private/protected method
    $_openPopupAfterDataLoaded(dataSourceId) {
      if (this.showPopups && this.clusteredPoints === false) {
        this.mapObject.on('sourcedata', (event) => {
          // https://maplibre.org/maplibre-gl-js-docs/api/events/#mapdataevent
          if (event.isSourceLoaded && event.sourceId === dataSourceId && event.coord) {
            const { features } = event.source.data;

            if (Array.isArray(features)) {
              const featuresCoordinates = {
                Point: (feature) => feature.geometry.coordinates,
                MultiPoint: (feature) => feature.geometry.coordinates[0],
                Polygon: (feature) => feature.geometry.coordinates[0][0],
                MultiPolygon: (feature) => feature.geometry.coordinates[0][0][0],
                LineString: (feature) => feature.geometry.coordinates[0],
                MultiLineString: (feature) => feature.geometry.coordinates[0][0],
              };

              features.forEach((feature) => {
                const { type } = feature.geometry;
                const { openPopup } = feature.properties;

                if (openPopup && featuresCoordinates[type]) {
                  this.$_addPopupToMap(featuresCoordinates[type](feature), feature);
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
