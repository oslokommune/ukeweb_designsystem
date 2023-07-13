import Vue from 'vue';
import OsgMap from './map.vue';

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('osg-map');
  const mapElement2 = document.getElementById('osg-map2');
  const mapElement3 = document.getElementById('osg-map3');
  const mapElement4 = document.getElementById('osg-map4');
  const mapElement5 = document.getElementById('osg-map5');
  const mapElement6 = document.getElementById('osg-map6');
  const mapElement7 = document.getElementById('osg-map7');
  const mapElement8 = document.getElementById('osg-map8');
  const mapElement9 = document.getElementById('osg-map9');
  const mapElement10 = document.getElementById('osg-map10');

  if (mapElement) {
    Vue.component('osg-map', OsgMap);
    const app = new Vue({ el: mapElement });
  }
  if (mapElement2) {
    Vue.component('osg-map', OsgMap);
    const app2 = new Vue({ el: mapElement2 });
  }
  if (mapElement3) {
    Vue.component('osg-map', OsgMap);
    const app3 = new Vue({ el: mapElement3 });
  }
  if (mapElement4) {
    Vue.component('osg-map', OsgMap);
    const app4 = new Vue({
      el: mapElement4,

      mounted() {
        this.$refs.osgMap4.resize();
      },

      methods: {
        resize() {
          console.log('Map has been resized');
        },
      },
    });
  }

  if (mapElement5) {
    Vue.component('osg-map', OsgMap);
    const app5 = new Vue({ el: mapElement5 });
  }

  if (mapElement6) {
    Vue.component('osg-map', OsgMap);
    const app6 = new Vue({ el: mapElement6 });
  }

  if (mapElement7) {
    Vue.component('osg-map', OsgMap);
    const app7 = new Vue({
      el: mapElement7,
      data: () => ({
        points: [{ longitude: 10.74981, latitude: 59.913008, popupContent: '<h2>Bob the Builder</h2>' }],
      }),

      mounted() {
        setTimeout(() => {
          this.points.push({ longitude: 10.73981, latitude: 59.910008, popupContent: '<h2>Baz the other Builder</h2>' });
        }, 10000);
      },
    });
  }

  if (mapElement8) {
    Vue.component('osg-map', OsgMap);
    const app8 = new Vue({
      el: mapElement8,
      data: () => ({
        geoJson: 'https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/kindergarten-with-events.geojson',
      }),

      mounted() {
        setTimeout(() => {
          this.geoJson = 'https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/featurecollection-with-popups.geojson';
        }, 15000);
      },
    });
  }

  if (mapElement9) {
    Vue.component('osg-map', OsgMap);
    const app9 = new Vue({
      el: mapElement9,
      data: () => ({
        state: { longitude: 10.74981, latitude: 59.913008, zoom: 10, showPopups: true, autoFitToBounds: false },
      }),

      mounted() {
        setTimeout(() => {
          this.state = { longitude: 10.64981, latitude: 59.915008, zoom: 15, showPopups: true, autoFitToBounds: false };
        }, 15000);
      },
    });
  }

  if (mapElement10) {
    Vue.component('osg-map', OsgMap);
    const app10 = new Vue({
      el: mapElement10,
      data: () => ({
        loadMap: false,
        state: { longitude: 10.74981, latitude: 59.913008, zoom: 10, showPopups: true, autoFitToBounds: false },
      }),
    });
  }
});
