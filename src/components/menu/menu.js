document.addEventListener("DOMContentLoaded", function () {
  let hamburgerButtonTriggers = document.querySelectorAll(".osg-button-menu");

  if (!hamburgerButtonTriggers) {
    return;
  }

  hamburgerButtonTriggers.forEach((hamburgerButtonTrigger) => {
    hamburgerButtonTrigger.addEventListener("click", (event) => {
      let iconButton = event.target.querySelector(".osg-button-menu__icon");
      let osgNavMenu = event.target.nextElementSibling;

      if (hamburgerButtonTrigger.getAttribute("aria-expanded") === "false") {
        hamburgerButtonTrigger.setAttribute("aria-expanded", "true");
      } else {
        hamburgerButtonTrigger.setAttribute("aria-expanded", "false");
      }

      if ((osgNavMenu && osgNavMenu.style.display === "none") || osgNavMenu.style.display === "") {
        osgNavMenu.style.display = "block";
      } else {
        osgNavMenu.style.display = "none";
      }

      iconButton.classList.toggle("osg-button-menu__icon--close");
      hamburgerButtonTrigger.classList.toggle("osg-button-menu--close");
    });
  });
});
