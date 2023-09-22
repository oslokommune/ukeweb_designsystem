function changeCounter(e) {
  const { target } = e;
  const input = e.currentTarget.previousElementSibling;
  let value;

  if (target.classList.contains('ods-input__counter-button--up') || target.classList.contains('ods-icon--chevron-thin-up')) {
    value = parseInt(input.value, 10);
    value += 1;
  } else {
    value = parseInt(input.value, 10);
    value -= 1;
  }
  input.value = value;
}

function triggerChangeNumber(callback) {
  const counterTriggers = document.querySelectorAll('.ods-input__counter-nav');
  counterTriggers.forEach((item) => {
    callback(item);
  });
}

const OdsInput = {
  init() {
    OdsInput.unbindAll();
    OdsInput.bindAll();
  },

  initElement(element) {
    OdsInput.unbindElement(element);
    OdsInput.bindElement(element);
  },

  bindElement(element) {
    element.addEventListener('click', changeCounter, false);
  },

  unbindElement(element) {
    element.removeEventListener('click', changeCounter, false);
  },

  bindAll() {
    triggerChangeNumber((item) => {
      item.addEventListener('click', changeCounter, false);
    });
  },

  unbindAll() {
    triggerChangeNumber((item) => {
      item.removeEventListener('click', changeCounter, false);
    });
  },
};

export default OdsInput;
