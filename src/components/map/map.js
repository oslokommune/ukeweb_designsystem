import Vue from 'vue';
import OdsMap from './map.vue';

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

  if (mapElement) {
    Vue.component('ods-map', OdsMap);
    const vm1 = new Vue();
    vm1.$mount(mapElement);
  }
  if (mapElement2) {
    Vue.component('ods-map', OdsMap);
    const vm2 = new Vue();
    vm2.$mount(mapElement2);
  }
  if (mapElement3) {
    Vue.component('ods-map', OdsMap);
    const vm3 = new Vue();
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
    Vue.component('ods-map', OdsMap);
    const vm5 = new Vue();
    vm5.$mount(mapElement5);
  }

  if (mapElement6) {
    Vue.component('ods-map', OdsMap);
    const vm6 = new Vue();
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
    Vue.component('ods-map', OdsMap);
    const vm8 = new Vue({
      data: () => ({
        geoJson: 'https://ukeweb-public.s3.dualstack.eu-central-1.amazonaws.com/map/data/kindergarten-with-events.geojson',
      }),

      mounted() {
        setTimeout(() => {
          this.geoJson = 'https://ukeweb-public.s3.dualstack.eu-central-1.amazonaws.com/map/data/featurecollection-with-popups.geojson';
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
});
