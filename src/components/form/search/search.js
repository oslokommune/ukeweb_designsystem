document.addEventListener('DOMContentLoaded', function () {
  let check = document.getElementById('components-form-search-dropdown');
  if (check) {
    check.addEventListener('change', function () {
      let dropdown = document.querySelector('.osg-search__dropdown');
      if (this.checked) {
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    });
  }
});
