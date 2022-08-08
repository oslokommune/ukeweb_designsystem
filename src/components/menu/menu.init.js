import { OsgMenu } from "./menu.js";

document.addEventListener("OsgMenuButtonClick", function (payload) {
  // console.log(payload.detail);
});

document.addEventListener("DOMContentLoaded", function () {
  OsgMenu();
});
