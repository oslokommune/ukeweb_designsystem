import OsgMenu from './menu';

document.addEventListener('DOMContentLoaded', () => {
  OsgMenu.init();

  const menu = document.getElementById('osg-menu-1');
  if (menu) {
    menu.addEventListener('OsgMenuOpen', (e) => {
      console.log('Menu opened', e.detail); // console.log in production = bad
    });
    menu.addEventListener('OsgMenuClose', (e) => {
      console.log('Menu closed', e.detail); // console.log in production = bad
    });
  }

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
