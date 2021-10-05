document.addEventListener("DOMContentLoaded", function () {
  let hamburgerButtonTriggers = document.querySelectorAll(".osg-button-menu");

  if (!hamburgerButtonTriggers) {
    return;
  }

  hamburgerButtonTriggers.forEach((hamburgerButtonTrigger) => {
    hamburgerButtonTrigger.addEventListener("click", (event) => {
      let iconButton = event.target.querySelector(".osg-button-menu__icon");

      if (hamburgerButtonTrigger.getAttribute("aria-expanded") === "false") {
        hamburgerButtonTrigger.setAttribute("aria-expanded", "true")
      } else {
        hamburgerButtonTrigger.setAttribute("aria-expanded", "false");
      }

      iconButton.classList.toggle("osg-button-menu__icon--close");
      hamburgerButtonTrigger.classList.toggle("osg-button-menu--close");
    });
  });
});
