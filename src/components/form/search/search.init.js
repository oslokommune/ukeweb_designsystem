import { OsgSearchJs, OsgSearchVue } from "./search.js";

document.addEventListener("DOMContentLoaded", function () {
  OsgSearchJs("trigger-1", "input-1", "id-results-1");
  OsgSearchJs("trigger-2", "input-2", "id-results-2");
  OsgSearchJs("trigger-3", "input-3", "id-results-3");
  OsgSearchJs("trigger-4", "input-4", "id-results-4");
  OsgSearchVue();
});
