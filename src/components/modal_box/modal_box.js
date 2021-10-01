document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".osg-modal");
  const triggers = document.querySelectorAll(".osg-modal-trigger--scoped");

  if (!modals) {
    return;
  }

  const openModals = document.querySelectorAll(".osg-modal-trigger");
  const closeModals = document.querySelectorAll(".osg-modal-content__button");
  const overlay = document.querySelectorAll(".osg-modal-overlay");

  function trapFocus(element) {
    var currentElement = element.currentTarget;
    var focusableEls = currentElement.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];
    var KEYCODE_TAB = 9;

    currentElement.addEventListener("keydown", function (e) {
      var isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        /* tab */
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }

  function toggleModal(event) {
    const buttonTarget = event.target;
    const isOpenButton = buttonTarget.classList.contains("osg-modal-trigger") || false;
    const isCloseButton = buttonTarget.classList.contains("osg-button--circle") || false;
    const isCloseSpan = buttonTarget.classList.contains("osg-button__icon") || false;
    let modalElement;

    if (isOpenButton) {
      modalElement = buttonTarget.nextElementSibling;
      if (buttonTarget.classList.contains("osg-modal-trigger--scoped")) {
        triggers[0].style.display = "none";
      }
    } else if (isCloseButton) {
      modalElement = buttonTarget.parentElement.parentElement;
      triggers[0].style.display = "block";
    } else if (isCloseSpan) {
      modalElement = buttonTarget.parentElement.parentElement.parentElement;
      triggers[0].style.display = "block";
    }

    modalElement.classList.toggle("osg-modal-content--open");

    if (modalElement.getAttribute("aria-hidden") === "true") {
      modalElement.setAttribute("aria-hidden", "false");
    } else {
      modalElement.setAttribute("aria-hidden", "true");
    }
  }

  openModals.forEach((openModal) => {
    openModal.addEventListener("click", toggleModal, false);
  });
  closeModals.forEach((closeModal) => {
    closeModal.addEventListener("click", toggleModal, false);
  });
  modals.forEach((modal) => {
    modal.addEventListener("click", trapFocus.bind(modal), false);
  });
});
