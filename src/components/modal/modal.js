document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('.osg-modal');

  if (!modal) {
    return;
  }

  const modalOpen = document.querySelector('.osg-modal__open');
  const modalClose = document.querySelector('.osg-button--circle');

  function trapFocus(element) {
    var currentElement = element.currentTarget;
    var focusableEls = currentElement.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];
    var KEYCODE_TAB = 9;

    currentElement.addEventListener('keydown', function(e) {
      var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) /* shift + tab */ {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
            e.preventDefault();
          }
        } else { /* tab */
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
            e.preventDefault();
          }
        }
    });
  }

  function toggleModal () {
    modal.classList.toggle('osg-modal--open');

    (modal.getAttribute('aria-hidden') === 'true')
    ? modal.setAttribute('aria-hidden', 'false')
    : modal.setAttribute('aria-hidden', 'true');
  }

  modalOpen.addEventListener('click', toggleModal, false);
  modalClose.addEventListener('click', toggleModal, false);
  modal.addEventListener('keydown', trapFocus.bind(modal), false);

});
