document.addEventListener('DOMContentLoaded', function () {
  let check = document.getElementById('components-form-search-seasons-dropdown');
  if (check) {
    check.addEventListener('change', function () {
      let dropdowns = document.querySelectorAll('.osg-search-seasons__dropdown');
      let searchForms = document.querySelectorAll('.osg-search-seasons__input-wrapper');

      dropdowns.forEach((dropdown) => {
        dropdown.style.display = this.checked ? 'block' : 'none';
      });

      searchForms.forEach((searchForm) => {
        this.checked
        ? searchForm.setAttribute('aria-expanded', 'true')
        : searchForm.setAttribute('aria-expanded', 'false')
      });
    });
  }
});
