const btnCalculate = document.getElementById('btn-calculate');
const inputWeight = document.getElementById('input-weight');
const inputHeight = document.getElementById('input-height');
const btnCloseModal = document.getElementById('btn-close-modal');

const AlertError = {
  open() {
    const alertError = document.getElementById('alert-error');
    alertError.classList.add('open');
  },

  close() {
    const alertError = document.getElementById('alert-error');
    alertError.classList.remove('open');
  },
};

const Modal = {
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

function isNumber(value) {
  if (typeof value === 'string' && value.trim().length === 0) {
    return false;
  }

  value = value.trim().replace(',', '.');
  return !isNaN(value);
}

function imc(weight, height) {
  return weight / (height * height);
}

function calcImc() {
  let weight = inputWeight.value;
  let height = inputHeight.value;

  if (isNumber(weight) && isNumber(height)) {
    weight = weight.trim().replace(',', '.');
    height = height.trim().replace(',', '.');

    const imcVal = imc(Number(weight), Number(height)).toFixed(2);

    Modal.open(`Seu IMC é ${imcVal}`);
    AlertError.close();
  } else {
    AlertError.open();
  }
}

btnCalculate.addEventListener('click', calcImc);
btnCloseModal.addEventListener('click', () => {
  Modal.close();
});
