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
      expanded: e.target.classList.contains("osg-collapsible-trigger--expanded")
    }
  });

  e.target.dispatchEvent(toggleEvent);
}

function toggleCollapsible(e) {
  e.preventDefault();

  const collapsible = document.getElementById(e.target.getAttribute("aria-controls"));

  if ((e.code && e.code === 'Enter' && collapsible) || (!e.code && collapsible) ){
    collapsible.classList.toggle("osg-collapsible-content--collapsed");

    e.target.setAttribute("aria-expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? "false" : "true");
    e.target.classList.toggle("osg-collapsible-trigger--expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? false : true);
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
    element.addEventListener("keyup", handleCollapsible);
  },

  unbindElement(element) {
    element.removeEventListener("click", handleCollapsible);
    element.removeEventListener("keyup", handleCollapsible);
  },

  bindAll() {
    window.addEventListener("OsgBreakpointChange", handleBreakpointChange);
    triggerIterator((item) => {
      item.addEventListener("click", handleCollapsible);
      item.addEventListener("keyup", handleCollapsible);
    });
  },

  unbindAll() {
    window.removeEventListener("OsgBreakpointChange", handleBreakpointChange);
    triggerIterator((item) => {
      item.removeEventListener("click", handleCollapsible);
      item.removeEventListener("keyup", handleCollapsible);
    });
  },
};
