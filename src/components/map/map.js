import OsgMap from "./map.vue";

document.addEventListener("DOMContentLoaded", function () {
  let mapElement = document.getElementById("osg-map");
  let mapElement2 = document.getElementById("osg-map2");
  let mapElement3 = document.getElementById("osg-map3");
  let mapElement4 = document.getElementById("osg-map4");
  let mapElement5 = document.getElementById("osg-map5");
  let mapElement6 = document.getElementById("osg-map6");

  if (mapElement) {
    Vue.component("osg-map", OsgMap);
    var app = new Vue({ el: mapElement });

    // To interact with the map from the outside, you can do someting like this:
    // app.$refs.osgMap.clearMapAndData()
    // app.$refs.osgMap.setGeoJson("https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/data/featurecollection.geojson");
    // app.$refs.osgMap.populateMap();
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
});
