document.addEventListener('DOMContentLoaded', function () {
  let searchSeasonsDropdownTriggers = document.querySelectorAll('.components-form-search-seasons-dropdown');
  if (searchSeasonsDropdownTriggers) {
    searchSeasonsDropdownTriggers.forEach(trigger => {
      trigger.addEventListener('change', function () {
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
    });
  }
});
