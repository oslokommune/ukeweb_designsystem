import dispatchCustomEvent from '../../../utils/js/events/dispatchCustomEvent';

function triggerIterator(callback) {
  const collapsibleTriggers = document.querySelectorAll('.ods-collapsible-trigger');
  collapsibleTriggers.forEach((item) => {
    callback(item);
  });
}

function handleAnimation(e) {
  if (e.currentTarget.classList.contains('ods-animation') && e.currentTarget.classList.contains('ods-animation--rotate-plus-minus')) {
    e.currentTarget.classList.toggle('ods-animation--rotate-plus-minus-open');
  } else if (e.currentTarget.classList.contains('ods-animation')) {
    e.currentTarget.classList.toggle('ods-animation--rotate-open');
  }
}

function toggleCollapsible(e) {
  e.preventDefault();

  const collapsible = document.getElementById(e.currentTarget.getAttribute('aria-controls'));

  if ((e.code && e.code === 'Enter' && collapsible) || (!e.code && collapsible)) {
    collapsible.classList.toggle('ods-collapsible-content--collapsed');

    handleAnimation(e);

    e.currentTarget.setAttribute('aria-expanded', collapsible.classList.contains('ods-collapsible-content--collapsed') ? 'false' : 'true');
    e.currentTarget.classList.toggle('ods-collapsible-trigger--expanded', !collapsible.classList.contains('ods-collapsible-content--collapsed'));
  }
}

function handleCollapsible(e) {
  toggleCollapsible(e);
  dispatchCustomEvent('OdsCollapsibleToggle', { target: e.currentTarget, expanded: e.currentTarget.classList.contains('ods-collapsible-trigger--expanded') }, e.currentTarget);
}

function handleBreakpointChange(e) {
  const { breakpoint } = e.detail;

  if (breakpoint === 'medium' || breakpoint === 'large') {
    triggerIterator((item) => {
      const collapsible = document.getElementById(item.getAttribute('aria-controls'));
      if (collapsible && (collapsible.classList.contains('ods-collapsible-content--expanded-breakpoint-medium') || collapsible.classList.contains('ods-collapsible-content--expanded-breakpoint-large'))) {
        item.setAttribute('aria-expanded', 'true');
        item.setAttribute('aria-hidden', 'true');
      }
    });
  } else {
    triggerIterator((item) => {
      const collapsible = document.getElementById(item.getAttribute('aria-controls'));
      if (collapsible && (collapsible.classList.contains('ods-collapsible-content--expanded-breakpoint-medium') || collapsible.classList.contains('ods-collapsible-content--expanded-breakpoint-large'))) {
        item.setAttribute('aria-expanded', collapsible.classList.contains('ods-collapsible-content--collapsed') ? 'false' : 'true');
        item.removeAttribute('aria-hidden');
      }
    });
  }
}

const OdsCollapsible = {
  init() {
    OdsCollapsible.unbindAll();
    OdsCollapsible.bindAll();
  },

  initElement(element) {
    OdsCollapsible.unbindElement(element);
    OdsCollapsible.bindElement(element);
  },

  bindElement(element) {
    element.addEventListener('click', handleCollapsible);
    element.addEventListener('keypress', handleCollapsible);
  },

  unbindElement(element) {
    element.removeEventListener('click', handleCollapsible);
    element.removeEventListener('keypress', handleCollapsible);
  },

  bindAll() {
    window.addEventListener('OdsBreakpointChange', handleBreakpointChange);
    triggerIterator((item) => {
      item.addEventListener('click', handleCollapsible);
      item.addEventListener('keypress', handleCollapsible);
    });
  },

  unbindAll() {
    window.removeEventListener('OdsBreakpointChange', handleBreakpointChange);
    triggerIterator((item) => {
      item.removeEventListener('click', handleCollapsible);
      item.removeEventListener('keypress', handleCollapsible);
    });
  },
};

export default OdsCollapsible;
