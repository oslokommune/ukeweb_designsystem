let previousTarget = null;
let spacePressed = false;

function triggerIterator(callback) {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((item) => {
    callback(item);
  });
}

function addFocusCheckbox(e) {
  if (e.key === "Tab" && e.target.nextElementSibling || e.type === 'click' && e.target.nextElementSibling) {
    console.log('addFocusCheckbox');
    e.target.nextElementSibling.classList.add('ods-checkbox--focused');
    previousTarget = e.target;
  }
}

function removeFocusCheckbox(e) {
  if (e.type === "keydown" && e.key === " ") {
    spacePressed = true;
    return; 
  }

  if (e.type === "click" && spacePressed) {
    spacePressed = false;
    return; 
  }

  if ((e.key === "Tab" || e.type === 'click') && e.target.nextElementSibling) {
    console.log('removeFocusCheckbox');
    if (previousTarget && previousTarget.nextElementSibling) {
      previousTarget.nextElementSibling.classList.remove('ods-checkbox--focused');
    }
  }
}

function handleGlobalClick(e) {
  // Check if clicked outside a checkbox
  if (e.target.type !== 'checkbox') {
    if (previousTarget && previousTarget.nextElementSibling) {
      previousTarget.nextElementSibling.classList.remove('ods-checkbox--focused');
    }
  }
}

export const OdsCheckboxEvents = {
  init() {
    OdsCheckboxEvents.unbindAll();
    OdsCheckboxEvents.bindAll();
    document.addEventListener("click", handleGlobalClick);
  },

  initElement(element) {
    OdsCheckboxEvents.unbindElement(element);
    OdsCheckboxEvents.bindElement(element);
  },

  bindElement(element) {
    element.addEventListener("click", removeFocusCheckbox);
    element.addEventListener("keydown", removeFocusCheckbox);
    element.addEventListener("keyup", addFocusCheckbox);
  },

  unbindElement(element) {
    element.removeEventListener("click", removeFocusCheckbox);
    element.removeEventListener("keydown", removeFocusCheckbox);
    element.removeEventListener("keyup", addFocusCheckbox);
  },

  bindAll() {
    triggerIterator((item) => {
      item.addEventListener("click", removeFocusCheckbox);
      item.addEventListener("keydown", removeFocusCheckbox);
      item.addEventListener("keyup", addFocusCheckbox);
    });
  },

  unbindAll() {
    triggerIterator((item) => {
      item.removeEventListener("click", removeFocusCheckbox);
      item.removeEventListener("keydown", removeFocusCheckbox);
      item.removeEventListener("keyup", addFocusCheckbox);
    });
    document.removeEventListener("click", handleGlobalClick);
  },
};