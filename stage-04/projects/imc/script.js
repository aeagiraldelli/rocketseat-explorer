import { Modal } from './modal.js';
import { AlertError } from './error.js';
import { isNumber, imc } from './utils.js';

const btnCalculate = document.getElementById('btn-calculate');

btnCalculate.addEventListener('click', () => {
  let weight = document.getElementById('input-weight').value;
  let height = document.getElementById('input-height').value;

  if (!isNumber(weight) || !isNumber(height)) {
    AlertError.open();
    return;
  }

  weight = weight.trim().replace(',', '.');
  height = height.trim().replace(',', '.');

  const imcVal = imc(Number(weight), Number(height)).toFixed(2);

  Modal.open(`Seu IMC é ${imcVal}`);
});
