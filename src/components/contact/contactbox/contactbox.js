import OsgCollapsible from '../../collapsible/collapsible';

function triggerIterator(callback) {
  const triggers = document.querySelectorAll('.ods-contactbox__trigger');
  triggers.forEach((item) => {
    callback(item);
  });
}

export default {
  addCollapse() {
    triggerIterator((item) => {
      const parent = item.parentNode.parentNode;
      const content = item.parentNode.nextElementSibling;
      content.classList.add('ods-collapsible-content', 'ods-collapsible-content--collapsed', 'ods-collapsible-content--ease');
      content.setAttribute('id', `${parent.id}-content`);

      item.classList.add('ods-collapsible-trigger');
      item.setAttribute('href', '#');
      item.setAttribute('aria-expanded', 'false');
      item.setAttribute('aria-controls', `${parent.id}-content`);

      OsgCollapsible.initElement(item);
    });
  },

  removeCollapse() {
    triggerIterator((item) => {
      const content = item.parentNode.nextElementSibling;
      content.classList.remove('ods-collapsible-content', 'ods-collapsible-content--collapsed', 'ods-collapsible-content--ease');
      content.removeAttribute('id');

      item.classList.remove('ods-collapsible-trigger');
      item.classList.remove('ods-collapsible-trigger--expanded');
      item.removeAttribute('href');
      item.removeAttribute('aria-expanded');
      item.removeAttribute('aria-controls');

      OsgCollapsible.unbindElement(item);
    });
  },
};
