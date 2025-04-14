let toggleModal;

// document.addEventListener("odsModalOpened", () => {
//   document.body.classList.add("ods-prevent-scroll");
// });
// document.addEventListener("odsModalClosed", () => {
//   document.body.classList.remove("ods-prevent-scroll");
// });


const trapFocus = (event) => {
  const isTabPressed = event.key === 'Tab';
  if (!isTabPressed) return;

  const currentElement = event.target;
  const modalContent = document.querySelectorAll('.ods-modal')[0];

  if (modalContent) {
    const focusableEls = modalContent.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const parentModalContent = currentElement.closest('.ods-modal');

    if (event.shiftKey && !parentModalContent) {
      lastFocusableEl.focus();
      event.preventDefault();
    } else if (!parentModalContent) {
      firstFocusableEl.focus();
      event.preventDefault();
    }
  }
};

const closeModal = (modal) => {
  if (modal) {
    modal.classList.remove('ods-modal--open');

    // Only remove event listener if close button exists
    const closeButton = modal.querySelector('.ods-modal__button button');
    if (closeButton) {
      closeButton.removeEventListener('click', toggleModal, false);
    }

    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keyup', trapFocus, false);

    const triggers = document.querySelectorAll(`[aria-controls=${modal.getAttribute('id')}]`);
    triggers.forEach((trigger) => {
      let { parentNode } = trigger;

      while (parentNode) {
        if (parentNode.classList?.contains('ods-modal')) return false;
        parentNode = parentNode.parentNode;
      }

      trigger.focus();
      return true;
    });

    modal.dispatchEvent(new CustomEvent('odsModalClosed', { bubbles: true }));
  }
};

toggleModal = (event) => {
  let trigger = event.target;

  if (!event.target.classList.contains('ods-modal-trigger')) {
    trigger = event.target.closest('.ods-modal-trigger');
  }
  const modalContent = document.getElementById(trigger.getAttribute('aria-controls'));

  if (modalContent) {
    const open = modalContent.classList.toggle('ods-modal--open');

    if (open) {
      modalContent.dispatchEvent(new CustomEvent('odsModalOpened', { bubbles: true }));
      modalContent.querySelectorAll('input,checkbox')[0]?.focus();
      document.addEventListener('keyup', trapFocus, false);

      const closeButton = modalContent.querySelector('.ods-modal__button button');
      if (closeButton) {
        closeButton.addEventListener('click', toggleModal, false);
      } else {
        // If there's no close button, only allow buttons with the trigger class inside the modal to close it
        modalContent.querySelectorAll('.ods-modal__content .ods-modal-trigger').forEach((btn) => {
          btn.addEventListener('click', () => closeModal(modalContent), false);
        });
      }
    } else {
      closeModal(modalContent);
    }
  }
};

const OdsModal = {
  init() {
    OdsModal.unbindAll();
    OdsModal.bindAll();
  },
  initSingle(trigger) {
    OdsModal.unbindSingle(trigger);
    OdsModal.bindSingle(trigger);
  },
  closeSingle(trigger) {
    closeModal(document.getElementById(trigger.getAttribute('aria-controls')));
  },
  bindSingle(trigger) {
    trigger.addEventListener('click', toggleModal, false);
  },
  unbindSingle(trigger) {
    trigger.removeEventListener('click', toggleModal, false);
  },
  bindAll() {
    const triggers = document.querySelectorAll('.ods-modal-trigger');
    triggers.forEach((trigger) => {
      OdsModal.bindSingle(trigger);
    });
  },
  unbindAll() {
    const triggers = document.querySelectorAll('.ods-modal-trigger');
    triggers.forEach((trigger) => {
      OdsModal.unbindSingle(trigger);
    });
  },
};

export default OdsModal;
