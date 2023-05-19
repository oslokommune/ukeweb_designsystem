const inputs = document.querySelectorAll('.osg-radio__input input');

function updateFontWeight() {
  const labels = document.querySelectorAll('.osg-radio__label');
  labels.forEach(label => {
    label.classList.remove('osg-radio__label--bold');
  });

  const checked = document.querySelector('.osg-radio__input input:checked');
  if (checked) {
    console.log('yay igjen!');
    console.log(checked.parentNode.nextElementSibling);
    const checkedLabel = checked.parentNode.nextElementSibling;
    checkedLabel.classList.add('osg-radio__label--bold');
    console.log(checkedLabel);
  }
}

inputs.forEach(input => {
  input.addEventListener('change', updateFontWeight);
});

document.addEventListener('DOMContentLoaded', updateFontWeight);
