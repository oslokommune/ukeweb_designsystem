document.addEventListener('DOMContentLoaded', function () {
  let check = document.getElementById('components-form-search-seasons-dropdown');
  if (check) {
    check.addEventListener('change', function () {
      let dropdowns = document.querySelectorAll('.osg-search-seasons__dropdown');
      dropdowns.forEach((dropdown) => {
        if (this.checked) {
          dropdown.style.display = 'block';
        } else {
          dropdown.style.display = 'none';
        }
      });
    });

    let dropdowns = document.querySelectorAll('.osg-search-seasons__dropdown');
    dropdowns.forEach((dropdown) => {
      if (this.checked) {
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    });
  }
});
