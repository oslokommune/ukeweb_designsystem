export const OsgBreakpointsInit = () => {
  window.addEventListener("DOMContentLoaded", reportWindowSize);
  window.addEventListener("resize", reportWindowSize);

  let previousBreakpoint = null;
  function reportWindowSize() {
    let data = {
      detail: {
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: null,
      },
    };

    if (window.innerWidth < 768) {
      data.detail.breakpoint = "small";
    } else if (window.innerWidth < 1024) {
      data.detail.breakpoint = "medium";
    } else {
      data.detail.breakpoint = "large";
    }

    if (data.detail.breakpoint !== previousBreakpoint) {
      previousBreakpoint = data.detail.breakpoint;
      window.dispatchEvent(new CustomEvent("OsgBreakpointChange", data));
    }
  }
};
