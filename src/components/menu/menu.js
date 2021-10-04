document.addEventListener("DOMContentLoaded", function () {
  let hamburgerButtonTrigger = document.querySelector(".osg-button-menu");

  if (hamburgerButtonTrigger) {
    hamburgerButtonTrigger.addEventListener("click", () => {
      let iconButton = document.querySelector(".osg-button-menu__icon");

      (hamburgerButtonTrigger.getAttribute("aria-expanded") === "false")
        ? hamburgerButtonTrigger.setAttribute("aria-expanded", "true")
        : hamburgerButtonTrigger.setAttribute("aria-expanded", "false");

      iconButton.classList.toggle("osg-button-menu__icon--close");
      hamburgerButtonTrigger.classList.toggle("osg-button-menu--close");
    });
  }
});
