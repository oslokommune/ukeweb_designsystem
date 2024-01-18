import { createApp } from 'vue';
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
    const app1 = createApp({
      components: { OdsMap },
    });
    app1.mount(mapElement);
  }
  if (mapElement2) {
    const app2 = createApp({
      components: { OdsMap },
    });
    app2.mount(mapElement2);
  }
  if (mapElement3) {
    const app3 = createApp({
      components: { OdsMap },
    });
    app3.mount(mapElement3);
  }
  if (mapElement4) {
    const app1 = createApp({
      components: { OdsMap },
      mounted() {
        this.$refs.odsMap4.resize();
      },

      methods: {
        resize() {},
      },
    });
    app4.mount(mapElement4);
  }

  if (mapElement5) {
    const app5 = createApp({
      components: { OdsMap },
    });
    app5.mount(mapElement5);
  }

  if (mapElement6) {
    const app6 = createApp({
      components: { OdsMap },
    });
    app6.mount(mapElement6);
  }

  if (mapElement7) {
    const app7 = createApp({
      components: { OdsMap },
      data: () => ({
        points: [{ longitude: 10.74981, latitude: 59.913008, popupContent: '<h2>Bob the Builder</h2>' }],
      }),

      mounted() {
        setTimeout(() => {
          this.points.push({ longitude: 10.73981, latitude: 59.910008, popupContent: '<h2>Baz the other Builder</h2>' });
        }, 10000);
      },
    });
    app7.mount(mapElement7);
  }

  if (mapElement8) {
    const app8 = createApp({
      components: { OdsMap },
      data: () => ({
        geoJson: 'https://ukeweb-public.s3.dualstack.eu-central-1.amazonaws.com/map/data/kindergarten-with-events-ods.geojson',
      }),

      mounted() {
        setTimeout(() => {
          this.geoJson = 'https://ukeweb-public.s3.dualstack.eu-central-1.amazonaws.com/map/data/featurecollection-with-popups.geojson';
        }, 15000);
      },
    });
    app8.mount(mapElement8);
  }

  if (mapElement9) {
    const app9 = createApp({
      components: { OdsMap },
      data: () => ({
        state: { longitude: 10.74981, latitude: 59.913008, zoom: 10, showPopups: true, autoFitToBounds: false },
      }),

      mounted() {
        setTimeout(() => {
          this.state = { longitude: 10.64981, latitude: 59.915008, zoom: 15, showPopups: true, autoFitToBounds: false };
        }, 15000);
      },
    });
    app9.mount(mapElement9);
  }

  if (mapElement10) {
    const app10 = createApp({
      components: { OdsMap },
      data: () => ({
        loadMap: false,
        state: { longitude: 10.74981, latitude: 59.913008, zoom: 10, showPopups: true, autoFitToBounds: false },
      }),
    });
    app10.mount(mapElement10);
  }
});
