function setSelectState(element, event) {
  const select = element.querySelector('.ods-combobox__select');
  select.classList.add(`ods-combobox__select--${event.type}`);
}

function unsetSelectState(element, event) {
  const select = element.querySelector('.ods-combobox__select');
  select.classList.remove(`ods-combobox__select--${event.type}`);
}

function attachEventListeners(element) {
  const input = element.querySelector('.ods-combobox__input');

  input.addEventListener('focus', (event) => {
    setSelectState(element, event);
  });
  // event parameter should be type focus and be passed by the place it is called???
  input.addEventListener('blur', (event) => {
    unsetSelectState(element, { type: 'focus' });
    setSelectState(element, event); // like this?
  });
}

function detachEventListeners(element) {
  const input = element.querySelector('.ods-combobox__input');

  input.removeEventListener('hover', (event) => {
    setSelectState(element, event);
  });
}

function elementIterator(callback) {
  const elements = document.querySelectorAll('.ods-combobox');
  elements.forEach((element) => {
    callback(element);
  });
}

const OdsCombobox = {
  init() {
    OdsCombobox.unbindAll();
    OdsCombobox.bindAll();
  },

  initElement(element) {
    OdsCombobox.unbindElement(element);
    OdsCombobox.bindElement(element);
  },

  bindElement(element) {
    attachEventListeners(element);
  },

  unbindElement(element) {
    detachEventListeners(element);
  },

  bindAll() {
    elementIterator((element) => {
      attachEventListeners(element);
    });
  },

  unbindAll() {
    elementIterator((element) => {
      detachEventListeners(element);
    });
  },
};

export default OdsCombobox;
