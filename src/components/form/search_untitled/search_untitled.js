document.addEventListener('DOMContentLoaded', function () {
  let check = document.getElementById('components-form-search-untitled-dropdown');
  if (check) {
    check.addEventListener('change', function () {
      let dropdowns = document.querySelectorAll('.osg-search-untitled__dropdown');
      dropdowns.forEach((dropdown) => {
        if (this.checked) {
          dropdown.style.display = 'block';
        } else {
          dropdown.style.display = 'none';
        }
      });
    });

    let dropdowns = document.querySelectorAll('.osg-search-untitled__dropdown');
    dropdowns.forEach((dropdown) => {
      if (this.checked) {
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    });
  }
});
