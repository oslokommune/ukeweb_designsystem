document.addEventListener('DOMContentLoaded', function () {
  const collapsibleTriggers = document.querySelectorAll('.osg-collapsible__trigger');
  collapsibleTriggers.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const collapsible = document.getElementById(e.target.getAttribute('aria-controls'));
      if (collapsible) {
        collapsible.classList.toggle('osg-collapsible--collapsed');

        collapsible.setAttribute('aria-expanded',
          collapsible.classList.contains('osg-collapsible--collapsed') ? false : true
        );
        e.target.classList.toggle('osg-collapsible__trigger--expanded',
          collapsible.classList.contains('osg-collapsible--collapsed') ? false : true
        );
      }

      e.target.blur();
    });
  });
});
