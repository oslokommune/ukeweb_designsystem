function trapFocus(event) {
  const currentElement = event.target;
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
  event.preventDefault();
  const target = event.target;
  let modal = null;
  if (target.classList.contains("osg-modal-trigger")) {
    modal = document.getElementById(target.getAttribute("aria-controls"));
  } else {
    modal = target.closest(".osg-modal");
  }

  if (modal && modal.classList.contains("osg-modal--open")) {
    closeModal(modal);
  } else {
    openModal(modal);
  }
}

function openModal(modal) {
  if (modal) {
    modal.classList.add("osg-modal--open");
    modal.addEventListener("click", trapFocus, false);
    modal.setAttribute("aria-hidden", "false");

    const closeBtn = modal.querySelector(".osg-modal__button button");
    if (closeBtn) {
      closeBtn.addEventListener("click", toggleModal, false);
    }
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("osg-modal--open");
    modal.removeEventListener("click", trapFocus, false);
    modal.setAttribute("aria-hidden", "true");

    const closeBtn = modal.querySelector(".osg-modal__button button");
    if (closeBtn) {
      closeBtn.removeEventListener("click", toggleModal, false);
    }
  }
}

export const OsgModalBox = {
  init() {
    OsgModalBox.unbindAll();
    OsgModalBox.bindAll();
  },
  initSingle(trigger) {
    OsgModalBox.unbindSingle(trigger);
    OsgModalBox.bindSingle(trigger);
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
      OsgModalBox.bindSingle(trigger);
    });
  },
  unbindAll() {
    const triggers = document.querySelectorAll(".osg-modal-trigger");
    triggers.forEach((trigger) => {
      OsgModalBox.unbindSingle(trigger);
    });
  },
};
