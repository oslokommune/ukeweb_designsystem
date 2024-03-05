import Vue from 'vue';
import OdsMap from './map.vue';
import fetchGeoJsonData from './geoJsonUtils';

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('ods-map');
  const mapElement2 = document.getElementById('ods-map2');
  const mapElement3 = document.getElementById('ods-map3');
  const mapElement4 = document.getElementById('ods-map4');
  const mapElement5 = document.getElementById('ods-map5');
  const mapElement6 = document.getElementById('ods-map6');
  const mapElement7 = document.getElementById('ods-map7');
  const mapElement8 = document.getElementById('ods-map8');
  const mapElement9 = document.getElementById('ods-map9');
  const mapElement10 = document.getElementById('ods-map10');
  const mapElement11 = document.getElementById('ods-map11');

  if (mapElement) {
    Vue.component('ods-map', OdsMap);
    const vm1 = new Vue();
    vm1.$mount(mapElement);
  }

  if (mapElement2) {
    const vm2 = new Vue({
      data() {
        return {
          geoJsonData: null,
        };
      },
      async mounted() {
        setTimeout(async () => {
          try {
            this.geoJsonData = await fetchGeoJsonData('https://ukeweb-public.s3.dualstack.eu-central-1.amazonaws.com/map/data/kindergarten-with-events.geojson');
          } catch (error) {
            throw new Error('Error fetching GeoJSON data:', error);
          }
        }, 15000);
      },
    });
    vm2.$mount(mapElement2);
  }

  if (mapElement3) {
    const vm3 = new Vue({
      data() {
        return {
          geoJsonData: null,
        };
      },
      async mounted() {
        setTimeout(async () => {
          try {
            this.geoJsonData = await fetchGeoJsonData('https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/featurecollection-with-popups-and-multi-variants.geojson');
          } catch (error) {
            throw new Error('Error fetching GeoJSON data:', error);
          }
        }, 15000);
      },
    });
    vm3.$mount(mapElement3);
  }

  if (mapElement4) {
    Vue.component('ods-map', OdsMap);
    const vm4 = new Vue({
      mounted() {
        this.$refs.odsMap4.resize();
      },

      methods: {
        resize() {},
      },
    });
    vm4.$mount(mapElement4);
  }

  if (mapElement5) {
    const vm5 = new Vue({
      data() {
        return {
          geoJsonData: null,
        };
      },
      async mounted() {
        setTimeout(async () => {
          try {
            this.geoJsonData = await fetchGeoJsonData('https://ukeweb-public.s3.dualstack.eu-central-1.amazonaws.com/map/data/kindergarten-with-events.geojson');
          } catch (error) {
            throw new Error('Error fetching GeoJSON data:', error);
          }
        }, 15000);
      },
    });
    vm5.$mount(mapElement5);
  }

  if (mapElement6) {
    const vm6 = new Vue({
      data() {
        return {
          geoJsonData: null,
        };
      },
      async mounted() {
        setTimeout(async () => {
          try {
            this.geoJsonData = await fetchGeoJsonData('https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/featurecollection-with-popups-and-multi-variants.geojson');
          } catch (error) {
            throw new Error('Error fetching GeoJSON data:', error);
          }
        }, 15000);
      },
    });
    vm6.$mount(mapElement6);
  }

  if (mapElement7) {
    Vue.component('ods-map', OdsMap);
    const vm7 = new Vue({
      data: () => ({
        points: [{ longitude: 10.74981, latitude: 59.913008, popupContent: '<h2>Bob the Builder</h2>' }],
      }),

      mounted() {
        setTimeout(() => {
          this.points.push({ longitude: 10.73981, latitude: 59.910008, popupContent: '<h2>Baz the other Builder</h2>' });
        }, 10000);
      },
    });
    vm7.$mount(mapElement7);
  }

  if (mapElement8) {
    const vm8 = new Vue({
      data() {
        return {
          geoJsonData: null,
        };
      },
      async created() {
        try {
          this.geoJsonData = await fetchGeoJsonData('https://ukeweb-public.s3.dualstack.eu-central-1.amazonaws.com/map/data/kindergarten-with-events-ods.geojson');
        } catch (error) {
          throw new Error('Error fetching GeoJSON data:', error);
        }
      },
      async mounted() {
        setTimeout(async () => {
          try {
            this.geoJsonData = await fetchGeoJsonData('https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/featurecollection-with-popups-and-multi-variants.geojson');
          } catch (error) {
            throw new Error('Error fetching GeoJSON data:', error);
          }
        }, 15000);
      },
    });
    vm8.$mount(mapElement8);
  }

  if (mapElement9) {
    Vue.component('ods-map', OdsMap);
    const vm9 = new Vue({
      data: () => ({
        state: { longitude: 10.74981, latitude: 59.913008, zoom: 10, showPopups: true, autoFitToBounds: false },
      }),

      mounted() {
        setTimeout(() => {
          this.state = { longitude: 10.64981, latitude: 59.915008, zoom: 15, showPopups: true, autoFitToBounds: false };
        }, 15000);
      },
    });
    vm9.$mount(mapElement9);
  }

  if (mapElement10) {
    Vue.component('ods-map', OdsMap);
    const vm10 = new Vue({
      data: () => ({
        loadMap: false,
        state: { longitude: 10.74981, latitude: 59.913008, zoom: 10, showPopups: true, autoFitToBounds: false },
      }),
    });
    vm10.$mount(mapElement10);
  }

  if (mapElement11) {
    const vm11 = new Vue({
      data() {
        return {
          geoJsonData: null,
          loadMap: false,
        };
      },
      async created() {
        try {
          this.geoJsonData = await fetchGeoJsonData('https://ukeweb-public.s3.dualstack.eu-central-1.amazonaws.com/map/data/kindergarten-with-events-ods.geojson');
        } catch (error) {
          throw new Error('Error fetching GeoJSON data:', error);
        }
      },
      methods: {
        showMap() {
          this.loadMap = true;
        },
        hideMap() {
          this.loadMap = false;
        },
      },
      async mounted() {
        setTimeout(async () => {
          try {
            this.geoJsonData = await fetchGeoJsonData('https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/featurecollection-with-popups-and-multi-variants.geojson');
          } catch (error) {
            throw new Error('Error fetching GeoJSON data:', error);
          }
        }, 15000);

        const listViewBtn = document.getElementById('listViewBtn');
        const mapViewBtn = document.getElementById('mapViewBtn');

        listViewBtn.addEventListener('click', () => {
          this.hideMap();
        });
        mapViewBtn.addEventListener('click', () => {
          this.showMap();
        });
      },
    });
    vm11.$mount(mapElement11);
  }
});
