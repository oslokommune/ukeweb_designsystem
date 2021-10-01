import ImageCarousel from "./image_carousel.vue";

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("vue1")) {
    Vue.component("osg-image-carousel", ImageCarousel);
    new Vue({ el: "#vue1" });
  }
  if (document.getElementById("vue2")) {
    Vue.component("osg-image-carousel", ImageCarousel);
    new Vue({ el: "#vue2" });
  }
});
