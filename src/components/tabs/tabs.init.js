import OdsTabs from './tabs';

document.addEventListener('DOMContentLoaded', () => {
  OdsTabs.init();

  /* Example: Adding animation
  document.querySelectorAll(".ods-tabs").forEach((tabs) => {
    tabs.addEventListener(
      "OdsTabsActivate",
      function (payload) {
        payload.detail.tab.classList.add("animate__animated", "animate__bounce");
      },
      false
    );
  });
  */
});
