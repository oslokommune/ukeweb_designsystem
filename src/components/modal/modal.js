function trapFocus(event) {
  const isTabPressed = event.key === "Tab";
  if (!isTabPressed) {
    return;
  }

  const currentElement = event.target;
  const modalContent = document.querySelectorAll(".osg-modal")[0];

  if (modalContent) {
    const focusableEls = modalContent.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const parentModalContent = currentElement.closest(".osg-modal");

    if (event.shiftKey && !parentModalContent) {
      lastFocusableEl.focus();
      event.preventDefault();
    } else if (!parentModalContent) {
      firstFocusableEl.focus();
      event.preventDefault();
    }
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("osg-modal--open");
    modal.removeEventListener("click", trapFocus, false);
    modal.setAttribute("aria-hidden", "true");
    document.removeEventListener("keyup", trapFocus, false);

    const triggers = document.querySelectorAll(`[aria-controls=${filterPanel.getAttribute("id")}]`);
    triggers.forEach((trigger) => {
      let { parentNode } = trigger;

      while (parentNode) {
        if (parentNode.classList?.contains("osg-modal")) {
          return false;
        }
        parentNode = parentNode.parentNode;
      }

      trigger.focus();
      return true;
    });
  }
}

function toggleModal(event) {
  let trigger = event.target;

  if (!event.target.classList.contains("osg-modal-trigger")) {
    trigger = event.target.closest(".osg-modal-trigger");
  }
  const modalContent = document.getElementById(trigger.getAttribute("aria-controls"));

  if (modalContent) {
    const open = modalContent.classList.toggle("osg-modal--open");

    if (open) {
      modalContent.querySelectorAll("input,checkbox")[0].focus();
      document.addEventListener("keyup", trapFocus, false);
    } else {
      closeModal(modalContent);
    }
  }
}

export const OsgModal = {
  init() {
    OsgModal.unbindAll();
    OsgModal.bindAll();
  },
  initSingle(trigger) {
    OsgModal.unbindSingle(trigger);
    OsgModal.bindSingle(trigger);
  },
  closeSingle(trigger) {
    closeModal(document.getElementById(trigger.getAttribute("aria-controls")));
  },
  bindSingle(trigger) {
    trigger.addEventListener("click", toggleModal, false);
  },
  unbindSingle(trigger) {
    trigger.removeEventListener("click", toggleModal, false);
  },
  bindAll() {
    const triggers = document.querySelectorAll(".osg-modal-trigger");
    triggers.forEach((trigger) => {
      OsgModal.bindSingle(trigger);
    });
  },
  unbindAll() {
    const triggers = document.querySelectorAll(".osg-modal-trigger");
    triggers.forEach((trigger) => {
      OsgModal.unbindSingle(trigger);
    });
  },
};
