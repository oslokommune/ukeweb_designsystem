document.addEventListener('DOMContentLoaded', function () {
  let searchDropdownTriggers = document.querySelectorAll('.components-form-search-dropdown');
  if (searchDropdownTriggers) {
    searchDropdownTriggers.forEach(trigger => {
      trigger.addEventListener('change', function () {
        let dropdown = document.getElementById(this.getAttribute('aria-controls'));
        if (dropdown) {
          let searchForm = dropdown.previousElementSibling;

          if (this.checked) {
            dropdown.style.display = 'block';
            searchForm.setAttribute('aria-expanded', 'true');
          } else {
            dropdown.style.display = 'none';
            searchForm.setAttribute('aria-expanded', 'false');
          }
        }
      })
    });
  }
});
