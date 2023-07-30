export const AlertError = {
  open() {
    const alertError = document.getElementById('alert-error');
    alertError.classList.add('open');
  },

  close() {
    const alertError = document.getElementById('alert-error');
    alertError.classList.remove('open');
  },
};

const inputWeight = document.getElementById('input-weight');
inputWeight.addEventListener('input', () => {
  AlertError.close();
});

const inputHeight = document.getElementById('input-height');
inputHeight.addEventListener('input', () => {
  AlertError.close();
});
