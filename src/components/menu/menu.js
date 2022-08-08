export function OsgMenu() {
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
    if (!elem.classList.contains("osg-button-menu")) {
    }
    if ((elem && elem.style.display === "none") || elem.style.display === "") {
      elem.style.display = "block";
    } else {
      elem.style.display = "none";
    }
  }

  function toggleAnimation(elem) {
    if (elem.classList.contains("osg-navbar-menu__list-animate--open")) {
      elem.classList.remove("osg-navbar-menu__list-animate--open");
      elem.classList.add("osg-navbar-menu__list-animate--close");
    } else {
      elem.classList.add("osg-navbar-menu__list-animate--open");
      elem.classList.remove("osg-navbar-menu__list-animate--close");
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
      const button = event.target.classList.contains("osg-button-menu") ? event.target : event.target.closest(".osg-button-menu");
      const navMenu = document.getElementById(button.getAttribute("aria-controls"));

      toggleAriaExpanded(hamburgerButtonTrigger);
      toggleDisplay(navMenu);

      hamburgerButtonTrigger.classList.toggle("osg-button-menu--close");

      document.dispatchEvent(
        new CustomEvent("OsgMenuButtonClick", {
          detail: {
            button: button,
            state: button.getAttribute("aria-expanded") === "true" ? "open" : "close",
          },
        })
      );
    });
  });

  collapsableHeadings.forEach((collapsableHeading) => {
    collapsableHeading.addEventListener("click", (event) => {
      let collapsableContent = event.target.nextElementSibling.closest("ul") || event.target.nextElementSibling;
      toggleAriaExpanded(event.target);
      toggleExpandIcon(event.target);
      toggleAnimation(collapsableContent);
    });
  });
}
