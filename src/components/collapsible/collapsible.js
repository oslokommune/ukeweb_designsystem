document.addEventListener('DOMContentLoaded', function () {
  const collapsibleTriggers = document.querySelectorAll('.osg-collapsible-trigger');
  collapsibleTriggers.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const collapsible = document.getElementById(e.target.getAttribute('aria-controls'));
      if (collapsible) {
        collapsible.classList.toggle('osg-collapsible-content--collapsed');

        e.target.setAttribute('aria-expanded',
          collapsible.classList.contains('osg-collapsible-content--collapsed') ? false : true
        );
        e.target.classList.toggle('osg-collapsible-trigger--expanded',
          collapsible.classList.contains('osg-collapsible-content--collapsed') ? false : true
        );
      }

      e.target.blur();
    });
  });
});
