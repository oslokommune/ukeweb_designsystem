import { OsgBreakpointsInit } from "./breakpoints.js";

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Call init once in a project
   */
  OsgBreakpointsInit();

  /**
   * Add event listener whereever you want to do something based on a breakpoint change
  window.addEventListener("OsgBreakpointChange", function (detail) {
    console.log("OsgBreakpointChange", detail);
  });
  */
});
