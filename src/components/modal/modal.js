document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('.osg-modal');
  const modalOpen = document.querySelector('.osg-modal__open');
  const modalClose = document.querySelector('.osg-button--circle');
  const tabKey = 9;

  function toggleModal () {
    modal.classList.toggle('osg-modal--open');

    (modal.getAttribute('aria-hidden') === 'true')
    ? modal.setAttribute('aria-hidden', 'false')
    : modal.setAttribute('aria-hidden', 'true');
  }

  modalOpen.addEventListener('click', toggleModal, false);
  modalClose.addEventListener('click', toggleModal, false);
  modal.addEventListener('keydown', trapTabKey, false);
});