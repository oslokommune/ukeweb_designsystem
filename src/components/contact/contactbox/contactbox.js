import { OsgCollapsible } from "../../collapsible/collapsible.js";

function triggerIterator(callback) {
  const triggers = document.querySelectorAll(".osg-contactbox__trigger");
  triggers.forEach((item) => {
    callback(item);
  });
}

export default {
  addCollapse() {
    triggerIterator((item) => {
      const parent = item.parentNode.parentNode;
      const content = item.parentNode.nextElementSibling;
      content.classList.add("osg-collapsible-content", "osg-collapsible-content--collapsed", "osg-collapsible-content--ease");
      content.setAttribute("id", `${parent.id}-content`);

      item.classList.add("osg-collapsible-trigger");
      item.setAttribute("href", "#");
      item.setAttribute("aria-expanded", "false");
      item.setAttribute("aria-controls", `${parent.id}-content`);

      OsgCollapsible.initElement(item);
    });
  },

  removeCollapse() {
    triggerIterator((item) => {
      const content = item.parentNode.nextElementSibling;
      content.classList.remove("osg-collapsible-content", "osg-collapsible-content--collapsed", "osg-collapsible-content--ease");
      content.removeAttribute("id");

      item.classList.remove("osg-collapsible-trigger");
      item.classList.remove("osg-collapsible-trigger--expanded");
      item.removeAttribute("href");
      item.removeAttribute("aria-expanded");
      item.removeAttribute("aria-controls");

      OsgCollapsible.unbindElement(item);
    });
  },
};
