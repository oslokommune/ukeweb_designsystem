import OsgDate from "./date.vue";

document.addEventListener("DOMContentLoaded", function () {
  let osgDatePlaceholder = document.getElementById("osg-date-vue");
  if (osgDatePlaceholder) {
    Vue.component("osg-date", OsgDate);
    new Vue({
      el: osgDatePlaceholder,
    });
  }
});
