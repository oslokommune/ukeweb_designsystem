import OsgBreakpoints from './breakpoints';

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Add event listener whereever you want to do something based on a breakpoint change */
  // window.addEventListener("OsgBreakpointChange", function (detail) {
  // console.log("OsgBreakpointChange", detail);
  // });

  /**
   * Call init once in a project
   */
  OsgBreakpoints.init();
});
