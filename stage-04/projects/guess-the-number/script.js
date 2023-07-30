let btnGuess = document.getElementById('btn-guess');
let inputGuess = document.getElementById('input-guess');
let resultMessage = document.getElementById('result-message');
let app = document.getElementById('app');
let result = document.getElementById('result');
let btnTryAgain = document.getElementById('btn-try-again');
let errorMessage = document.getElementById('error-message');

function genRandomNumber() {
  return Math.round(Math.random() * 10);
}
let secretNumber = genRandomNumber();
let attempts = 0;

let timer = null;
function setTimer(timeout = 2000) {
  timer = setTimeout(() => {
    errorMessage.classList.add('hide');
  }, timeout);
}

errorMessage.classList.add('hide');

btnGuess.onclick = () => {
  let userGuess = Number(inputGuess.value);
  attempts++;

  if (userGuess === secretNumber) {
    resultMessage.innerHTML = `Acertou em ${attempts} tentativas.`;
    app.classList.add('hide');
    result.classList.remove('hide');
  } else {
    errorMessage.classList.remove('hide');
    if (timer !== null) {
      clearTimeout(timer);
      setTimer();
    } else {
      setTimer();
    }
  }
};

btnTryAgain.onclick = () => {
  attempts = 0;
  secretNumber = genRandomNumber();
  inputGuess.value = 0;

  result.classList.add('hide');
  errorMessage.classList.add('hide');
  app.classList.remove('hide');
};
