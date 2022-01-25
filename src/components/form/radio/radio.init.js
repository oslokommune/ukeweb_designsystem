import Vue from "vue";
import OsgRadio from "./radio.vue";

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("osg-radio-vue-1")) {
    Vue.component("osg-radio", OsgRadio);
    new Vue({ el: "#osg-radio-vue-1" });
  }
});
