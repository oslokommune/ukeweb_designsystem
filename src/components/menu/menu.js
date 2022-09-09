function triggerIterator(callback) {
  const menuButtons = document.querySelectorAll(".osg-button-menu");

  menuButtons.forEach((item) => {
    callback(item);
  });
}

function triggerHeadingIterator(callback) {
  const collapsableHeadings = document.querySelectorAll(".osg-navbar-menu__heading-collapsable");

  collapsableHeadings.forEach((item) => {
    callback(item);
  });
}

function toggleHeading(e) {
  e.preventDefault();
  const headingButton = e.target.classList.contains("osg-navbar-menu__heading-collapsable") ? e.target : e.target.closest(".osg-navbar-menu__heading-collapsable");
  const collapsibleContent = headingButton.nextElementSibling.closest("ul") || headingButton.nextElementSibling;

  if ((e.code === "Enter" && collapsibleContent) || (!e.code && collapsibleContent)) {
    let headingButtonIconClassList = headingButton.querySelector(".osg-icon").classList;

    headingButton.setAttribute("aria-expanded", collapsibleContent.classList.contains("osg-navbar-menu__list-animate--open") ? "false" : "true");
    collapsibleContent.classList.toggle("osg-navbar-menu__list-animate--open");

    if (headingButtonIconClassList.contains("osg-icons--plus-sign")) {
      headingButtonIconClassList.remove("osg-icons--plus-sign");
      headingButtonIconClassList.add("osg-icons--minus-sign");
    } else {
      headingButtonIconClassList.add("osg-icons--plus-sign");
      headingButtonIconClassList.remove("osg-icons--minus-sign");
    }
  }
}

function handleToggleHeading(e) {
  toggleHeading(e);

  let toggleEvent = new CustomEvent("OsgHeadingToggle", {
    detail: {
      target: e.target,
      expanded: e.target.classList.contains("osg-navbar-menu__list-animate--open"),
    },
  });

  e.target.dispatchEvent(toggleEvent);
}

function toggleMenu(e) {
  e.preventDefault();
  const menuButton = e.target.classList.contains("osg-button-menu") ? e.target : e.target.closest(".osg-button-menu");
  const menu = document.getElementById(menuButton.getAttribute("aria-controls"));

  if ((e.code === "Enter" && menu) || (!e.code && menu)) {
    menuButton.setAttribute("aria-expanded", menuButton.classList.contains("osg-button-menu--open") ? "false" : "true");
    menuButton.classList.toggle("osg-button-menu--open");
    menu.style.display = !menu.style.display || menu.style.display === "none" ? "block" : "none";
  }
}

function handleToggleMenu(e) {
  toggleMenu(e);

  let toggleEvent = new CustomEvent("OsgMenuToggle", {
    detail: {
      target: e.target,
      expanded: e.target.classList.contains("osg-button-menu--open"),
    },
  });

  e.target.dispatchEvent(toggleEvent);
}

export const OsgMenu = {
  init() {
    OsgMenu.unbindAll();
    OsgMenu.bindAll();
  },

  initElement(element) {
    OsgMenu.unbindElement(element);
    OsgMenu.bindElement(element);
  },

  bindElement(element) {
    element.addEventListener("click", handleToggleMenu);
    element.addEventListener("keypress", handleToggleMenu);
  },

  unbindElement(element) {
    element.removeEventListener("click", handleToggleMenu);
    element.removeEventListener("keypress", handleToggleMenu);
  },

  bindAll() {
    triggerIterator((item) => {
      item.addEventListener("click", handleToggleMenu);
      item.addEventListener("keypress", handleToggleMenu);
    });
    triggerHeadingIterator((item) => {
      item.addEventListener("click", handleToggleHeading);
      item.addEventListener("keypress", handleToggleHeading);
    });
  },

  unbindAll() {
    triggerIterator((item) => {
      item.removeEventListener("click", handleToggleMenu);
      item.removeEventListener("keypress", handleToggleMenu);
    });
    triggerHeadingIterator((item) => {
      item.removeEventListener("click", handleToggleHeading);
      item.removeEventListener("keypress", handleToggleHeading);
    });
  },
};
