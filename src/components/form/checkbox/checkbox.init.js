import Vue from "vue";
import OsgCheckbox from "./checkbox.vue";

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("osg-checkbox-vue-1")) {
    Vue.component("osg-checkbox", OsgCheckbox);
    new Vue({ el: "#osg-checkbox-vue-1" });
  }
});
