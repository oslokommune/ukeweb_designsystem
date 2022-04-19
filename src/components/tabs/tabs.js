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

function setActiveTrigger(trigger) {
  const OsgTabs = trigger.closest(".osg-tabs");
  if (OsgTabs) {
    const triggers = OsgTabs.querySelectorAll(".osg-tabs__trigger");
    triggers.forEach((trigger) => {
      trigger.classList.remove("osg-tabs__trigger--active");
    });

    trigger.classList.add("osg-tabs__trigger--active");
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

    tab.classList.add("osg-tabs__tab--active", "animate__animated", "animate__slideInRight");
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
    element.addEventListener("keypress", handleTabFocus);
  },

  unbindElement(element) {
    element.removeEventListener("click", handleTabFocus);
    element.removeEventListener("keypress", handleTabFocus);
  },

  bindAll() {
    triggerIterator((item) => {
      item.addEventListener("click", handleTabFocus);
      item.addEventListener("keypress", handleTabFocus);
    });
  },

  unbindAll() {
    triggerIterator((item) => {
      item.removeEventListener("click", handleTabFocus);
      item.removeEventListener("keypress", handleTabFocus);
    });
  },
};
