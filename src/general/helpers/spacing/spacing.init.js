document.addEventListener("DOMContentLoaded", function () {
  /* Generate markup for sizes */
  const spacingSizes = [0, 1, 2, 3, 4, 5, 8, 11, 13, 19, 25];
  const spacingBlockContainer = document.getElementById("spacing-blocks");
  if (spacingBlockContainer) {
    spacingSizes.forEach((size) => {
      let element = document.createElement("span");
      element.classList.add("osg-color-bg-blue");
      element.classList.add("osg-inline-block");
      element.classList.add("osg-padding-" + size);
      element.classList.add("osg-margin-right-1");

      let value = document.createElement("span");
      value.classList.add("osg-color-bg-blue-dark");
      value.classList.add("osg-color-text-white");
      value.innerText = size;
      element.appendChild(value);

      spacingBlockContainer.appendChild(element);
    });
  }
});
