export function OsgSlidePanel(idContainer, idTriggerBtn, idSlide, idCloseBtn) {
  let container = document.getElementById(idContainer),
    slideTrigger = document.getElementById(idTriggerBtn),
    slidePanel = document.getElementById(idSlide),
    closeBtn = document.getElementById(idCloseBtn);

  slidePanel.style.left = container.offsetWidth + "px";
  container.style.height = window.getComputedStyle(slidePanel).height;

  function togglePanel() {
    slidePanel.classList.toggle("osg-slide-panel__content--open");
    slidePanel.style.visibility = slidePanel.style.visibility == "visible" ? "none" : "visible";
    slidePanel.style.transition = "all 0.75s ease-in";
    closeBtn.tabIndex = closeBtn.tabIndex === -1 ? 0 : -1;
  }

  window.addEventListener("resize", () => {
    slidePanel.style.transition = "none";
    slidePanel.style.left = container.offsetWidth + "px";
  });

  slideTrigger.addEventListener("click", () => {
    togglePanel();
  });

  closeBtn.addEventListener("click", () => {
    togglePanel();
  });
}
