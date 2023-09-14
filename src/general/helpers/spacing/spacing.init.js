document.addEventListener('DOMContentLoaded', () => {
  /* Generate markup for sizes */
  const spacingSizes = [0, 1, 2, 3, 4, 5, 6, 8, 11, 13, 19, 25];
  const spacingBlockContainer = document.getElementById('spacing-blocks');
  if (spacingBlockContainer) {
    spacingSizes.forEach((size) => {
      const element = document.createElement('span');
      element.classList.add('ods-color-bg-blue');
      element.classList.add('ods-inline-block');
      element.classList.add(`ods-padding-${size}`);
      element.classList.add('ods-margin-right-1');

      const value = document.createElement('span');
      value.classList.add('ods-color-bg-blue-dark');
      value.classList.add('ods-color-text-white');
      value.innerText = size;
      element.appendChild(value);

      spacingBlockContainer.appendChild(element);
    });
  }
});
