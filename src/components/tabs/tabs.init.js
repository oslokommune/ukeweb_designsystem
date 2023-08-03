import OsgTabs from './tabs';

document.addEventListener('DOMContentLoaded', () => {
  OsgTabs.init();

  /* Example: Adding animation
  document.querySelectorAll(".osg-tabs").forEach((tabs) => {
    tabs.addEventListener(
      "OsgTabsActivate",
      function (payload) {
        payload.detail.tab.classList.add("animate__animated", "animate__bounce");
      },
      false
    );
  });
  */
});
