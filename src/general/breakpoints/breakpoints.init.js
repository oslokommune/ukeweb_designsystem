import OdsBreakpoints from './breakpoints';

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Add event listener whereever you want to do something based on a breakpoint change */
  // window.addEventListener("OdsBreakpointChange", function (detail) {
  // console.log("OdsBreakpointChange", detail);
  // });

  /**
   * Call init once in a project
   */
  OdsBreakpoints.init();
});
