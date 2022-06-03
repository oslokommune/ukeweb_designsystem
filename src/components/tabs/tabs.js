function triggerIterator(callback) {
  const triggers = document.querySelectorAll(".osg-tabs__trigger");
  triggers.forEach((item) => {
    callback(item);
  });
}

function handleTabFocus(event) {
  const trigger = event.target;
  if (trigger) {
    const tab = document.getElementById(trigger.getAttribute("aria-controls"));
    if (tab) {
      setActiveTrigger(trigger);
      setActiveTab(tab);
    } else {
      console.error("Tab not found");
    }
  } else {
    console.error("No trigger found");
  }
}

function handleKeyEvent(event) {
  const nextSibling = event.target.nextElementSibling;
  const previousSibling = event.target.previousElementSibling;
  switch (event.keyCode) {
    case 39: // right arrow
      if (nextSibling) {
        event.target.nextElementSibling.focus();
      } else {
        event.target.parentNode.firstElementChild.focus();
      }
      break;
    case 37: // left arrow
      if (previousSibling) {
        event.target.previousElementSibling.focus();
      } else {
        event.target.parentNode.lastElementChild.focus();
      }
      break;
    case 36: // home
      event.target.parentNode.firstElementChild.focus();
      break;
    case 35: // end
      event.target.parentNode.lastElementChild.focus();
      break;
    case 13: // enter
    case 32: // space
      handleTabFocus(event);
      break;
    default:
      return false;
  }
}

function setActiveTrigger(trigger) {
  const OsgTabs = trigger.closest(".osg-tabs");
  if (OsgTabs) {
    const triggers = OsgTabs.querySelectorAll(".osg-tabs__trigger");
    triggers.forEach((trigger) => {
      trigger.setAttribute("aria-selected", "false");
      trigger.setAttribute("tabindex", "-1");
    });

    trigger.setAttribute("aria-selected", "true");
    trigger.removeAttribute("tabindex");
  } else {
    console.error("No OsgTabs found");
  }
}

function setActiveTab(tab) {
  const OsgTabs = tab.closest(".osg-tabs");
  if (OsgTabs) {
    const tabs = OsgTabs.querySelectorAll(".osg-tabs__tab");
    tabs.forEach((tab) => {
      tab.classList.remove("osg-tabs__tab--active");
    });

    tab.classList.add("osg-tabs__tab--active");
  } else {
    console.error("No OsgTabs found");
  }
}

export const OsgTabs = {
  init() {
    OsgTabs.unbindAll();
    OsgTabs.bindAll();
  },

  initElement(element) {
    OsgTabs.unbindElement(element);
    OsgTabs.bindElement(element);
  },

  bindElement(element) {
    element.addEventListener("click", handleTabFocus);
    element.addEventListener("keydown", handleKeyEvent);
  },

  unbindElement(element) {
    element.removeEventListener("click", handleTabFocus);
    element.removeEventListener("keydown", handleKeyEvent);
  },

  bindAll() {
    triggerIterator((item) => {
      item.addEventListener("click", handleTabFocus);
      item.addEventListener("keydown", handleKeyEvent);
    });
  },

  unbindAll() {
    triggerIterator((item) => {
      item.removeEventListener("click", handleTabFocus);
      item.removeEventListener("keydown", handleKeyEvent);
    });
  },
};
