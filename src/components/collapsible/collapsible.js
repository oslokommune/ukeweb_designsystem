function triggerIterator(callback) {
  const collapsibleTriggers = document.querySelectorAll(".osg-collapsible-trigger");
  collapsibleTriggers.forEach((item) => {
    callback(item);
  });
}

function handleCollapsible(e) {
  toggleCollapsible(e);

  let toggleEvent = new CustomEvent("OsgCollapsibleToggle", {
    detail: {
      target: e.target,
      expanded: e.target.classList.contains("osg-collapsible-trigger--expanded"),
    },
  });

  e.target.dispatchEvent(toggleEvent);
}

function toggleCollapsible(e) {
  e.preventDefault();

  const collapsible = document.getElementById(e.currentTarget.getAttribute("aria-controls"));
  const elementTarget = document.querySelector(".osg-infobox__icon-trigger") ? e.currentTarget : e.target;

  if ((e.code && e.code === "Enter" && collapsible) || (!e.code && collapsible)) {
    collapsible.classList.toggle("osg-collapsible-content--collapsed");

    elementTarget.setAttribute("aria-expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? "false" : "true");
    elementTarget.classList.toggle("osg-collapsible-trigger--expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? false : true);

    if (document.querySelector(".osg-infobox__icon-trigger")) {
      toggleIcon(elementTarget);
    }
  }
}

function toggleIcon(e) {
  const child = e.nextElementSibling ? e.nextElementSibling.children[0] : e.children[1].children[0];
  if (child.classList.contains("osg-icon--close")) {
    child.classList.add("osg-icon--chevron-thin-down");
    child.classList.remove("osg-icon--close");
  } else if (child.classList.contains("osg-icon--chevron-thin-down")) {
    child.classList.add("osg-icon--close");
    child.classList.remove("osg-icon--chevron-thin-down");
  }
}

function handleBreakpointChange(e) {
  const breakpoint = e.detail.breakpoint;

  if (breakpoint === "medium" || breakpoint === "large") {
    triggerIterator((item) => {
      const collapsible = document.getElementById(item.getAttribute("aria-controls"));
      if (collapsible && (collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-medium") || collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-large"))) {
        item.setAttribute("aria-expanded", "true");
        item.setAttribute("aria-hidden", "true");
      }
    });
  } else {
    triggerIterator((item) => {
      const collapsible = document.getElementById(item.getAttribute("aria-controls"));
      if (collapsible && (collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-medium") || collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-large"))) {
        item.setAttribute("aria-expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? "false" : "true");
        item.removeAttribute("aria-hidden");
      }
    });
  }
}

export const OsgCollapsible = {
  init() {
    OsgCollapsible.unbindAll();
    OsgCollapsible.bindAll();
  },

  initElement(element) {
    OsgCollapsible.unbindElement(element);
    OsgCollapsible.bindElement(element);
  },

  bindElement(element) {
    element.addEventListener("click", handleCollapsible);
    element.addEventListener("keypress", handleCollapsible);
  },

  unbindElement(element) {
    element.removeEventListener("click", handleCollapsible);
    element.removeEventListener("keypress", handleCollapsible);
  },

  bindAll() {
    window.addEventListener("OsgBreakpointChange", handleBreakpointChange);
    triggerIterator((item) => {
      item.addEventListener("click", handleCollapsible);
      item.addEventListener("keypress", handleCollapsible);
    });
  },

  unbindAll() {
    window.removeEventListener("OsgBreakpointChange", handleBreakpointChange);
    triggerIterator((item) => {
      item.removeEventListener("click", handleCollapsible);
      item.removeEventListener("keypress", handleCollapsible);
    });
  },
};
