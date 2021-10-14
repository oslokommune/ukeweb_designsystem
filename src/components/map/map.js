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
