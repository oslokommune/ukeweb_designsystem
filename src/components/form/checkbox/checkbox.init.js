import Vue from "vue";
import OsgCheckbox from "./checkbox.vue";
import { OsgCheckbox1 } from "./checkbox.js";

document.addEventListener("DOMContentLoaded", function () {
  OsgCheckbox1();
  if (document.getElementById("osg-checkbox-vue-1")) {
    Vue.component("osg-checkbox", OsgCheckbox);
    new Vue({ el: "#osg-checkbox-vue-1" });
  }
});
