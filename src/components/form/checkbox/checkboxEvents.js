let previousTarget = null;

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
  console.log('removeFocusCheckbox', e.previousTarget);
  if (e.key === "Tab" && e.target.nextElementSibling || e.type === 'click' && e.target.nextElementSibling) {
    previousTarget.nextElementSibling.classList.remove('ods-checkbox--focused');
  }
}

export const OdsCheckboxEvents = {
  init() {
    OdsCheckboxEvents.unbindAll();
    OdsCheckboxEvents.bindAll();
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
  },
};