document.addEventListener('DOMContentLoaded', () => {
  const check = document.getElementById('employee-search-form-search-dropdown');
  if (check) {
    check.addEventListener('change', function () {
      const dropdown = document.querySelector('.osg-search-inline__dropdown');
      const searchForm = document.querySelector('#employee-search-form-search-dropdown');

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
