const alertError = document.getElementById('alert-error');
const btnCalculate = document.getElementById('btn-calculate');
const inputWeight = document.getElementById('input-weight');
const inputHeight = document.getElementById('input-height');
const modal = document.getElementById('modal-layer');
const imcResultMessage = document.getElementById('imc-result');
const btnCloseModal = document.getElementById('btn-close-modal');

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

    imcResultMessage.innerText = `Seu IMC é de ${imcVal}`;
    modal.classList.add('open');
    alertError.classList.remove('open');
  } else {
    alertError.classList.add('open');
  }
}

function closeModal() {
  modal.classList.remove('open');
}

btnCalculate.addEventListener('click', calcImc);
btnCloseModal.addEventListener('click', closeModal);
