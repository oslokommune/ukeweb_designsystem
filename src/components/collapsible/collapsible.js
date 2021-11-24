export const OsgCollapsible = () => {
  window.addEventListener("OsgBreakpointChange", handleBreakpointChange);

  triggerIterator((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const collapsible = document.getElementById(e.target.getAttribute("aria-controls"));
      if (collapsible) {
        collapsible.classList.toggle("osg-collapsible-content--collapsed");

        e.target.setAttribute("aria-expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? false : true);
        e.target.classList.toggle("osg-collapsible-trigger--expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? false : true);
      }

      e.target.blur();
    });
  });

  function triggerIterator(callback) {
    const collapsibleTriggers = document.querySelectorAll(".osg-collapsible-trigger");
    collapsibleTriggers.forEach((item) => {
      callback(item);
    });
  }

  function handleBreakpointChange(e) {
    const breakpoint = e.detail.breakpoint;

    if (breakpoint === "medium" || breakpoint === "large") {
      triggerIterator((item) => {
        const collapsible = document.getElementById(item.getAttribute("aria-controls"));
        if (collapsible && (collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-medium") || collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-large"))) {
          item.setAttribute("aria-expanded", true);
          item.setAttribute("aria-hidden", true);
        }
      });
    } else {
      triggerIterator((item) => {
        const collapsible = document.getElementById(item.getAttribute("aria-controls"));
        if (collapsible && (collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-medium") || collapsible.classList.contains("osg-collapsible-content--expanded-breakpoint-large"))) {
          item.setAttribute("aria-expanded", collapsible.classList.contains("osg-collapsible-content--collapsed") ? false : true);
          item.removeAttribute("aria-hidden");
        }
      });
    }
  }
};
