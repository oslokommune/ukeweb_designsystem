import dispatchCustomEvent from '../../general/utils/dispatchCustomEvent';

/**
 * Menu open / close functions
 */
function triggerIterator(callback) {
  const menuButtons = document.querySelectorAll('.osg-button-menu');

  menuButtons.forEach((item) => {
    callback(item);
  });
}

function getMenuFromMenuButton(menuButton) {
  return document.getElementById(menuButton.getAttribute('aria-controls'));
}

function isMenuOpen(menuButtonElement) {
  return menuButtonElement.classList.contains('osg-button-menu--open');
}

function openMenu(menu) {
  const menuButton = document.querySelector(`[aria-controls="${menu.id}"]`);
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.classList.add('osg-button-menu--open');
  menu.style.display = 'block';

  dispatchCustomEvent('OsgMenuOpen', { menuButton, menu }, menu);
}

function closeMenu(menu) {
  const menuButton = document.querySelector(`[aria-controls="${menu.id}"]`);
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.classList.remove('osg-button-menu--open');
  menu.style.display = 'none';

  dispatchCustomEvent('OsgMenuClose', { menuButton, menu }, menu);
}

function handleToggleMenu(e) {
  e.preventDefault();
  const menuButton = e.target.classList.contains('osg-button-menu') ? e.target : e.target.closest('.osg-button-menu');
  const menu = getMenuFromMenuButton(menuButton);

  if ((e.code === 'Enter' && menu) || (!e.code && menu)) {
    if (isMenuOpen(menuButton)) {
      closeMenu(menu);
    } else {
      openMenu(menu);
    }
  }
}

/**
 * Menu heading functions
 */
function triggerHeadingIterator(element, callback) {
  const collapsableHeadings = element.querySelectorAll('.osg-navbar-menu__heading-collapsable');

  collapsableHeadings.forEach((item) => {
    callback(item);
  });
}

function handleToggleHeading(e) {
  e.preventDefault();
  const headingButton = e.target.classList.contains('osg-navbar-menu__heading-collapsable') ? e.target : e.target.closest('.osg-navbar-menu__heading-collapsable');
  const collapsibleContent = headingButton.nextElementSibling.closest('ul') || headingButton.nextElementSibling;

  if ((e.code === 'Enter' && collapsibleContent) || (!e.code && collapsibleContent)) {
    const headingButtonIconClassList = headingButton.querySelector('.osg-icon').classList;

    headingButton.setAttribute('aria-expanded', collapsibleContent.classList.contains('osg-navbar-menu__list-animate--open') ? 'false' : 'true');
    collapsibleContent.classList.toggle('osg-navbar-menu__list-animate--open');

    if (headingButtonIconClassList.contains('osg-icon--plus-sign')) {
      headingButtonIconClassList.remove('osg-icon--plus-sign');
      headingButtonIconClassList.add('osg-icon--minus-sign');
    } else {
      headingButtonIconClassList.add('osg-icon--plus-sign');
      headingButtonIconClassList.remove('osg-icon--minus-sign');
    }
  }

  dispatchCustomEvent('OsgHeadingToggle', { target: e.target, expanded: e.target.classList.contains('osg-navbar-menu__list-animate--open') }, e.target);
}

/**
 * Exported menu functions
 */
const OsgMenu = {
  init() {
    OsgMenu.unbindAll();
    OsgMenu.bindAll();
  },

  initElement(element) {
    OsgMenu.unbindElement(element);
    OsgMenu.bindElement(element);
  },

  bindElement(element) {
    element.addEventListener('click', handleToggleMenu);
    element.addEventListener('keypress', handleToggleMenu);

    OsgMenu.bindHeadings(element);
  },

  unbindElement(element) {
    element.removeEventListener('click', handleToggleMenu);
    element.removeEventListener('keypress', handleToggleMenu);

    OsgMenu.unbindHeadings(element);
  },

  bindHeadings(element) {
    triggerHeadingIterator(getMenuFromMenuButton(element), (item) => {
      item.addEventListener('click', handleToggleHeading);
      item.addEventListener('keypress', handleToggleHeading);
    });
  },

  unbindHeadings(element) {
    triggerHeadingIterator(getMenuFromMenuButton(element), (item) => {
      item.removeEventListener('click', handleToggleHeading);
      item.removeEventListener('keypress', handleToggleHeading);
    });
  },

  bindAll() {
    triggerIterator((item) => {
      OsgMenu.bindElement(item);
    });
  },

  unbindAll() {
    triggerIterator((item) => {
      OsgMenu.unbindElement(item);
    });
  },

  open(menu) {
    openMenu(menu);
  },

  close(menu) {
    closeMenu(menu);
  },
};

export default OsgMenu;
