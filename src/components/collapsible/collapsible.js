function triggerIterator(callback) {
  const collapsibleTriggers = document.querySelectorAll(".osg-collapsible-trigger");
  collapsibleTriggers.forEach((item) => {
    callback(item);
  });
}

function handleClick(e) {
  e.preventDefault();

  const collapsible = document.getElementById(e.target.getAttribute("aria-controls"));
  if (collapsible) {
    collapsible.classList.toggle("osg-collapsible-content--collapsed");

    e.target.setAttribute("aria-expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? "false" : "true");
    e.target.classList.toggle("osg-collapsible-trigger--expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? false : true);
  }
}

function onEnterPress(e) {
  e.preventDefault();
  const collapsible = document.getElementById(e.target.getAttribute("aria-controls"));

  if (e.code === 'Enter' && collapsible) {
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
    element.addEventListener("click", handleClick);
    element.addEventListener("keypress", onEnterPress);
  },

  unbindElement(element) {
    element.removeEventListener("click", handleClick);
    element.removeEventListener("keypress", onEnterPress);
  },

  bindAll() {
    window.addEventListener("OsgBreakpointChange", handleBreakpointChange);
    triggerIterator((item) => {
      item.addEventListener("click", handleClick);
      item.addEventListener("keypress", onEnterPress);
    });
  },

  unbindAll() {
    window.removeEventListener("OsgBreakpointChange", handleBreakpointChange);
    triggerIterator((item) => {
      item.removeEventListener("click", handleClick);
      item.removeEventListener("keypress", onEnterPress);
    });
  },
};
