import dispatchCustomEvent from '../../utils/js/events/dispatchCustomEvent';

function triggerIterator(callback) {
  const triggers = document.querySelectorAll('.osg-tabs__trigger');
  triggers.forEach((item) => {
    callback(item);
  });
}

const setActiveTrigger = (activetrigger) => {
  const OsgTabs = activetrigger.closest('.osg-tabs');
  if (OsgTabs) {
    const triggers = OsgTabs.querySelectorAll('.osg-tabs__trigger');
    triggers.forEach((trigger) => {
      trigger.setAttribute('aria-selected', 'false');
      trigger.setAttribute('tabindex', '-1');
    });

    activetrigger.setAttribute('aria-selected', 'true');
    activetrigger.removeAttribute('tabindex');
  }
};

const setActiveTab = (activeTab) => {
  const OsgTabs = activeTab.closest('.osg-tabs');
  if (OsgTabs) {
    const tabs = OsgTabs.querySelectorAll('.osg-tabs__tab');
    tabs.forEach((tab) => {
      tab.classList.remove('osg-tabs__tab--active');
    });

    activeTab.classList.add('osg-tabs__tab--active');
  }
};

const handleTabFocus = (event) => {
  const trigger = event.target;
  if (trigger) {
    const tab = document.getElementById(trigger.getAttribute('aria-controls'));
    if (tab) {
      const tabContainer = trigger.closest('.osg-tabs');

      dispatchCustomEvent('OsgTabsActivate', { trigger, tab }, tabContainer);

      setActiveTrigger(trigger);
      setActiveTab(tab);
    }
  }
};

const handleKeyEvent = (event) => {
  const nextSibling = event.target.nextElementSibling;
  const previousSibling = event.target.previousElementSibling;
  switch (event.key) {
    case 'ArrowRight':
      event.stopPropagation();
      event.preventDefault();
      if (nextSibling) {
        event.target.nextElementSibling.focus();
      } else {
        event.target.parentNode.firstElementChild.focus();
      }
      break;
    case 'ArrowLeft':
      event.stopPropagation();
      event.preventDefault();
      if (previousSibling) {
        event.target.previousElementSibling.focus();
      } else {
        event.target.parentNode.lastElementChild.focus();
      }
      break;
    case 'Home':
      event.stopPropagation();
      event.preventDefault();
      event.target.parentNode.firstElementChild.focus();
      break;
    case 'End':
      event.stopPropagation();
      event.preventDefault();
      event.target.parentNode.lastElementChild.focus();
      break;
    case 'Enter':
    case 'Space':
      handleTabFocus(event);
      break;
    default:
  }
};

const OsgTabs = {
  init() {
    OsgTabs.unbindAll();
    OsgTabs.bindAll();
  },

  initElement(element) {
    OsgTabs.unbindElement(element);
    OsgTabs.bindElement(element);
  },

  bindElement(element) {
    element.addEventListener('click', handleTabFocus);
    element.addEventListener('keydown', handleKeyEvent);
  },

  unbindElement(element) {
    element.removeEventListener('click', handleTabFocus);
    element.removeEventListener('keydown', handleKeyEvent);
  },

  bindAll() {
    triggerIterator((item) => {
      item.addEventListener('click', handleTabFocus);
      item.addEventListener('keydown', handleKeyEvent);
    });
  },

  unbindAll() {
    triggerIterator((item) => {
      item.removeEventListener('click', handleTabFocus);
      item.removeEventListener('keydown', handleKeyEvent);
    });
  },
};

export default OsgTabs;
