document.addEventListener("DOMContentLoaded", function () {
  let hamburgerButtonTriggers = document.querySelectorAll(".osg-button-menu");
  let collapsableHeadings = document.querySelectorAll(".osg-navbar-menu__collapsable-heading");

  if (!hamburgerButtonTriggers) {
    return;
  }

  function toggleAriaExpanded(elem) {
    if (elem.getAttribute("aria-expanded") === "false") {
      elem.setAttribute("aria-expanded", "true");
    } else {
      elem.setAttribute("aria-expanded", "false");
    }
  }

  function toggleDisplay(elem) {
    if ((elem && elem.style.display === "none") || elem.style.display === "") {
      elem.style.display = "block";
    } else {
      elem.style.display = "none";
    }
  }

  hamburgerButtonTriggers.forEach((hamburgerButtonTrigger) => {
    hamburgerButtonTrigger.addEventListener("click", (event) => {
      let iconButton = event.target.querySelector(".osg-button-menu__icon");
      let navMenu = event.target.nextElementSibling;

      toggleAriaExpanded(hamburgerButtonTrigger);
      toggleDisplay(navMenu);

      iconButton.classList.toggle("osg-button-menu__icon--close");
      hamburgerButtonTrigger.classList.toggle("osg-button-menu--close");
    });
  });

  collapsableHeadings.forEach((collapsableHeading) => {
    collapsableHeading.addEventListener("click", (event) => {
      let collapsableContent = event.target.nextElementSibling;
      toggleDisplay(collapsableContent);
      toggleAriaExpanded(event.target);
    });
  });
});
