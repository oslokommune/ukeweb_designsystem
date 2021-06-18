document.addEventListener('DOMContentLoaded', function () {
  const headings = document.querySelectorAll('h3');

  Array.prototype.forEach.call(headings, heading => {
    let btn = heading.querySelector('button');
    let icon = heading.querySelector('span');
    let expandContent = heading.nextElementSibling;

    btn.onclick = () => {
      let expanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !expanded);
      if (icon.classList.contains('osg-icons--chevron-thin-down')) {
        icon.classList.remove('osg-icons--chevron-thin-down');
        icon.classList.add('osg-icons--chevron-thin-up');
      } else if (icon.classList.contains('osg-icons--chevron-thin-up')) {
        icon.classList.remove('osg-icons--chevron-thin-up');
        icon.classList.add('osg-icons--chevron-thin-down');
      }

      expandContent.classList.toggle('osg-collapsible--collapsed');
    }
  });
});