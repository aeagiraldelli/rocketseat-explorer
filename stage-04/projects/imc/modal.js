export const Modal = {
  open(message) {
    const imcResultMessage = document.getElementById('imc-result');
    imcResultMessage.innerText = message;
    const modal = document.getElementById('modal-layer');
    modal.classList.add('open');
  },

  close() {
    const modal = document.getElementById('modal-layer');
    modal.classList.remove('open');
  },
};

const btnCloseModal = document.getElementById('btn-close-modal');
btnCloseModal.addEventListener('click', () => {
  Modal.close();
});

window.addEventListener('keydown', keydownHandler);
function keydownHandler(event) {
  if (event.key === 'Escape') {
    Modal.close();
  }
}
