import OsgMenu from './menu';

document.addEventListener('DOMContentLoaded', () => {
  OsgMenu.init();

  const menu2 = document.getElementById('osg-menu-2');
  if (menu2) {
    const btnOpen = document.getElementById('osg-menu-2-open');
    const btnClose = document.getElementById('osg-menu-2-close');
    btnOpen.addEventListener('click', () => {
      OsgMenu.open(menu2);
    });
    btnClose.addEventListener('click', () => {
      OsgMenu.close(menu2);
    });
  }
});
