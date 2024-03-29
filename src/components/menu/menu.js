import dispatchCustomEvent from '../../utils/js/events/dispatchCustomEvent';

/**
 * Menu open / close functions
 */
function triggerIterator(callback) {
  const menuButtons = document.querySelectorAll('.ods-button-menu');

  menuButtons.forEach((item) => {
    callback(item);
  });
}

function getMenuFromMenuButton(menuButton) {
  return document.getElementById(menuButton.getAttribute('aria-controls'));
}

function isMenuOpen(menuButtonElement) {
  return menuButtonElement.classList.contains('ods-button-menu--open');
}

function openMenu(menu) {
  const menuButton = document.querySelector(`[aria-controls="${menu.id}"]`);
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.classList.add('ods-button-menu--open');
  menu.style.display = 'block';

  dispatchCustomEvent('OdsMenuOpen', { menuButton, menu }, menu);
}

function closeMenu(menu) {
  const menuButton = document.querySelector(`[aria-controls="${menu.id}"]`);
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.classList.remove('ods-button-menu--open');
  menu.style.display = 'none';

  dispatchCustomEvent('OdsMenuClose', { menuButton, menu }, menu);
}

function handleToggleMenu(e) {
  e.preventDefault();
  const menuButton = e.target.classList.contains('ods-button-menu') ? e.target : e.target.closest('.ods-button-menu');
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
  const collapsableHeadings = element.querySelectorAll('.ods-navbar-menu__heading-collapsable');

  collapsableHeadings.forEach((item) => {
    callback(item);
  });
}

function handleToggleHeading(e) {
  e.preventDefault();
  const headingButton = e.target.classList.contains('ods-navbar-menu__heading-collapsable') ? e.target : e.target.closest('.ods-navbar-menu__heading-collapsable');
  const collapsibleContent = headingButton.nextElementSibling.closest('ul') || headingButton.nextElementSibling;

  if ((e.code === 'Enter' && collapsibleContent) || (!e.code && collapsibleContent)) {
    const headingButtonIconClassList = headingButton.querySelector('.ods-icon').classList;

    headingButton.setAttribute('aria-expanded', collapsibleContent.classList.contains('ods-navbar-menu__list-animate--open') ? 'false' : 'true');
    collapsibleContent.classList.toggle('ods-navbar-menu__list-animate--open');

    if (headingButtonIconClassList.contains('ods-icon--plus-sign')) {
      headingButtonIconClassList.remove('ods-icon--plus-sign');
      headingButtonIconClassList.add('ods-icon--minus-sign');
    } else {
      headingButtonIconClassList.add('ods-icon--plus-sign');
      headingButtonIconClassList.remove('ods-icon--minus-sign');
    }
  }

  dispatchCustomEvent('OdsHeadingToggle', { target: e.target, expanded: e.target.classList.contains('ods-navbar-menu__list-animate--open') }, e.target);
}

/**
 * Exported menu functions
 */
const OdsMenu = {
  init() {
    OdsMenu.unbindAll();
    OdsMenu.bindAll();
  },

  initElement(element) {
    OdsMenu.unbindElement(element);
    OdsMenu.bindElement(element);
  },

  bindElement(element) {
    element.addEventListener('click', handleToggleMenu);
    element.addEventListener('keypress', handleToggleMenu);

    OdsMenu.bindHeadings(element);
  },

  unbindElement(element) {
    element.removeEventListener('click', handleToggleMenu);
    element.removeEventListener('keypress', handleToggleMenu);

    OdsMenu.unbindHeadings(element);
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
      OdsMenu.bindElement(item);
    });
  },

  unbindAll() {
    triggerIterator((item) => {
      OdsMenu.unbindElement(item);
    });
  },

  open(menu) {
    openMenu(menu);
  },

  close(menu) {
    closeMenu(menu);
  },
};

export default OdsMenu;
