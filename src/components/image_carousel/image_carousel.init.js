import Vue from "vue";
import OsgImageCarousel from "./image_carousel.vue";

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("vue1")) {
    Vue.component("osg-image-carousel", OsgImageCarousel);
    new Vue({ el: "#vue1" });
  }
  if (document.getElementById("vue2")) {
    Vue.component("osg-image-carousel", OsgImageCarousel);
    new Vue({ el: "#vue2" });
  }
  if (document.getElementById("vue3")) {
    Vue.component("osg-image-carousel", OsgImageCarousel);
    new Vue({ el: "#vue3" });
  }
});
