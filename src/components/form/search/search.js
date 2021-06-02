document.addEventListener('DOMContentLoaded', function () {
  let check = document.getElementById('components-form-search-dropdown');
  if (check) {
    check.addEventListener('change', function () {
      let dropdown = document.querySelector('.osg-search__dropdown');
      let searchForm = document.querySelector('#osg-search__form');

      if (this.checked) {
        dropdown.style.display = 'block';
        searchForm.setAttribute('aria-expanded', 'true');
      } else {
        dropdown.style.display = 'none';
        searchForm.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
