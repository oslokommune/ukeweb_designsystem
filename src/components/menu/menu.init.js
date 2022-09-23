import { OsgMenu } from "./menu.js";

document.addEventListener("DOMContentLoaded", function () {
  OsgMenu.init();

  const menu = document.getElementById("osg-menu-1");
  if (menu) {
    menu.addEventListener("OsgMenuOpen", (e) => {
      console.log("Menu opened", e.detail);
    });
    menu.addEventListener("OsgMenuClose", (e) => {
      console.log("Menu closed", e.detail);
    });
  }

  const menu2 = document.getElementById("osg-menu-2");
  if (menu2) {
    const btnOpen = document.getElementById("osg-menu-2-open");
    const btnClose = document.getElementById("osg-menu-2-close");
    btnOpen.addEventListener("click", (e) => {
      OsgMenu.open(menu2);
    });
    btnClose.addEventListener("click", (e) => {
      OsgMenu.close(menu2);
    });
  }
});
