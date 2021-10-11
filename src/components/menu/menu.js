document.addEventListener("DOMContentLoaded", function () {
  let hamburgerButtonTriggers = document.querySelectorAll(".osg-button-menu");
  let collapsableHeadings = document.querySelectorAll(".osg-navbar-menu__heading-collapsable");

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

  function toggleDisplayResponsive(elem) {
    if (elem.classList.contains("osg-block")) {
      elem.classList.remove("osg-block");
      elem.classList.add("osg-none");
    } else {
      elem.classList.add("osg-block");
      elem.classList.remove("osg-none");
    }
  }

  function toggleExpandIcon(elem) {
    if (elem.querySelector(".osg-icon").classList.contains("osg-icons--plus-sign")) {
      elem.querySelector(".osg-icon").classList.remove("osg-icons--plus-sign");
      elem.querySelector(".osg-icon").classList.add("osg-icons--minus-sign");
    } else {
      elem.querySelector(".osg-icon").classList.remove("osg-icons--minus-sign");
      elem.querySelector(".osg-icon").classList.add("osg-icons--plus-sign");
    }
  }

  hamburgerButtonTriggers.forEach((hamburgerButtonTrigger) => {
    hamburgerButtonTrigger.addEventListener("click", (event) => {
      let iconButton = event.target.querySelector(".osg-button-menu__icon");
      let navMenu = event.target.parentNode.nextElementSibling;

      toggleAriaExpanded(hamburgerButtonTrigger);
      toggleDisplay(navMenu);

      iconButton.classList.toggle("osg-button-menu__icon--close");
      hamburgerButtonTrigger.classList.toggle("osg-button-menu--close");
    });
  });

  collapsableHeadings.forEach((collapsableHeading) => {
    collapsableHeading.addEventListener("click", (event) => {
      let collapsableContent = event.target.nextElementSibling;
      toggleDisplayResponsive(collapsableContent);
      toggleAriaExpanded(event.target);
      toggleExpandIcon(event.target);
    });
  });
});
