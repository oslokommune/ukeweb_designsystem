document.addEventListener("DOMContentLoaded", function () {
  let slideTriggers = document.querySelectorAll(".osg-trigger-panel");
  let closeTriggers = document.querySelectorAll(".osg-button-close");

  if (!slideTriggers) {
    return;
  }

  function togglePanel (elem) {
    if (elem.classList.contains("osg-slide-panel--open")) {
      elem.classList.remove("osg-slide-panel--open");
      elem.classList.add("osg-slide-panel--close");
    } else {
      elem.classList.add("osg-slide-panel--open");
      elem.classList.remove("osg-slide-panel--close");
    }
  }

  slideTriggers.forEach((slideTrigger) => {
    slideTrigger.addEventListener("click", (event) => {
      let slidePanel = event.target.nextElementSibling;
      togglePanel(slidePanel);
    });
  });

  closeTriggers.forEach((closeTrigger) => {
    closeTrigger.addEventListener("click", (event) => {
      let slidePanel = event.target.parentElement;
      togglePanel(slidePanel);
    });
  });
});
