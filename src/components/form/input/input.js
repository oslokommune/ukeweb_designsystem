function OsgInput() {
  const countInput = document.querySelector('.ods-input__input--number');

  if (!countInput) {
    return;
  }

  const btnUp = document.querySelector('.ods-input__counter-nav-button--up');
  const btnDown = document.querySelector('.ods-input__counter-nav-button--down');
  const countMin = countInput.min;
  const countMax = countInput.max;

  function increaseCount() {
    const oldValue = parseFloat(countInput.value);
    let newVal;

    if (oldValue >= countMax) {
      newVal = oldValue;
    } else {
      newVal = oldValue + 1;
    }
    countInput.value = newVal;
  }

  function decreaseCount() {
    const oldValue = parseFloat(countInput.value);
    let newVal;

    if (oldValue <= countMin) {
      newVal = oldValue;
    } else {
      newVal = oldValue - 1;
    }
    countInput.value = newVal;
  }

  btnUp.addEventListener('click', increaseCount, false);
  btnDown.addEventListener('click', decreaseCount, false);
}

export default OsgInput;
