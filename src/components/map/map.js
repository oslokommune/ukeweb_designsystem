import Vue from "vue";
import OsgMap from "./map.vue";

document.addEventListener("DOMContentLoaded", function () {
  let mapElement = document.getElementById("osg-map");
  let mapElement2 = document.getElementById("osg-map2");
  let mapElement3 = document.getElementById("osg-map3");
  let mapElement4 = document.getElementById("osg-map4");
  let mapElement5 = document.getElementById("osg-map5");
  let mapElement6 = document.getElementById("osg-map6");
  let mapElement7 = document.getElementById("osg-map7");
  let mapElement8 = document.getElementById("osg-map8");
  let mapElement9 = document.getElementById("osg-map9");

  if (mapElement) {
    Vue.component("osg-map", OsgMap);
    var app = new Vue({ el: mapElement });
  }

  if (mapElement2) {
    Vue.component("osg-map", OsgMap);
    var app2 = new Vue({ el: mapElement2 });
  }

  if (mapElement3) {
    Vue.component("osg-map", OsgMap);
    var app3 = new Vue({ el: mapElement3 });
  }

  if (mapElement4) {
    Vue.component("osg-map", OsgMap);
    var app4 = new Vue({ el: mapElement4 });
  }

  if (mapElement5) {
    Vue.component("osg-map", OsgMap);
    var app5 = new Vue({ el: mapElement5 });
  }

  if (mapElement6) {
    Vue.component("osg-map", OsgMap);
    var app6 = new Vue({ el: mapElement6 });
  }

  if (mapElement7) {
    Vue.component("osg-map", OsgMap);
    var app7 = new Vue({
      el: mapElement7,
      data: () => ({
        points: [{ latitude: 10.74981, longitude: 59.913008, heading: "Bob", description: "the builder!" }],
      }),

      mounted() {
        setTimeout(() => {
          this.points.push({ latitude: 10.73981, longitude: 59.910008, heading: "Bar", description: "the builder!" });
        }, 5000);
      },
    });
  }

  if (mapElement8) {
    Vue.component("osg-map", OsgMap);
    var app8 = new Vue({
      el: mapElement8,
      data: () => ({
        geoJson: "https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/kindergarten.geojson",
      }),

      mounted() {
        setTimeout(() => {
          this.geoJson = "https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/featurecollection.geojson";
        }, 15000);
      },
    });
  }

  if (mapElement9) {
    Vue.component("osg-map", OsgMap);
    var app9 = new Vue({
      el: mapElement9,
      data: () => ({
        state: { longitude: 10.74981, latitude: 59.913008, zoom: 10, showPopups: true },
      }),

      mounted() {
        setTimeout(() => {
          this.state = { longitude: 10.64981, latitude: 59.915008, zoom: 15, showPopups: true };
        }, 15000);
      },
    });
  }
});
