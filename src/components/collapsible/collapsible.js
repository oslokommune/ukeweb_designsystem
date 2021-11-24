export const OsgCollapsible = {
  bind() {
    window.addEventListener("OsgBreakpointChange", OsgCollapsible.handleBreakpointChange);

    OsgCollapsible.triggerIterator((item) => {
      item.addEventListener("click", OsgCollapsible.handleClick);
    });
  },

  unbind() {
    window.removeEventListener("OsgBreakpointChange", OsgCollapsible.handleBreakpointChange);
    OsgCollapsible.triggerIterator((item) => {
      item.removeEventListener("click", OsgCollapsible.handleClick);
    });
  },

  triggerIterator(callback) {
    const collapsibleTriggers = document.querySelectorAll(".osg-collapsible-trigger");
    collapsibleTriggers.forEach((item) => {
      callback(item);
    });
  },

  handleClick(e) {
    e.preventDefault();

    const collapsible = document.getElementById(e.target.getAttribute("aria-controls"));
    if (collapsible) {
      collapsible.classList.toggle("osg-collapsible-content--collapsed");

      e.target.setAttribute("aria-expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? false : true);
      e.target.classList.toggle("osg-collapsible-trigger--expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? false : true);
    }

    e.target.blur();
  },

  handleBreakpointChange(e) {
    const breakpoint = e.detail.breakpoint;

    if (breakpoint === "medium" || breakpoint === "large") {
      OsgCollapsible.triggerIterator((item) => {
        const collapsible = document.getElementById(item.getAttribute("aria-controls"));
        if (collapsible && (collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-medium") || collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-large"))) {
          item.setAttribute("aria-expanded", true);
          item.setAttribute("aria-hidden", true);
        }
      });
    } else {
      OsgCollapsible.triggerIterator((item) => {
        const collapsible = document.getElementById(item.getAttribute("aria-controls"));
        if (collapsible && (collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-medium") || collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-large"))) {
          item.setAttribute("aria-expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? false : true);
          item.removeAttribute("aria-hidden");
        }
      });
    }
  },
};
