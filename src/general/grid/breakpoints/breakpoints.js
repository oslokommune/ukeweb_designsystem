let previousBreakpoint = null;
export const OsgBreakpoints = {
  init() {
    window.addEventListener("resize", OsgBreakpoints.emitWindowSizeIfChanged);
    OsgBreakpoints.emitWindowSizeIfChanged();
  },

  unbind() {
    window.removeEventListener("resize", OsgBreakpoints.emitWindowSizeIfChanged);
  },

  emitWindowSizeIfChanged() {
    let data = {
      detail: {
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: OsgBreakpoints.getBreakpoint(),
      },
    };

    if (data.detail.breakpoint !== previousBreakpoint) {
      previousBreakpoint = data.detail.breakpoint;
      window.dispatchEvent(new CustomEvent("OsgBreakpointChange", data));
    }
  },

  getBreakpoint() {
    if (window.innerWidth < 768) {
      return "small";
    } else if (window.innerWidth < 1024) {
      return "medium";
    } else {
      return "large";
    }
  },
};
