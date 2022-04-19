import { OsgOpeningHours } from "./opening_hours";

document.addEventListener("opening-hours__trigger", function (payload) {
  console.log(payload.detail);
});

document.addEventListener("DOMContentLoaded", function () {
  OsgOpeningHours();
});
