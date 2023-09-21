import { controls, bgControls } from './elements.js';
import * as actions from './actions.js';
import { displayMinutes, displaySeconds } from './elements.js';
import state from './state.js';
import * as timer from './timer.js';

export function registerControls() {
  bgControls.addEventListener('click', (evt) => {
    const action = evt.target.dataset.action;
    if (typeof actions[action] === 'function') {
      actions[action]();
    }
  });

  controls.addEventListener('click', (evt) => {
    const action = evt.target.dataset.action;
    if (typeof actions[action] === 'function') {
      actions[action]();
    }
  });
}

export function setMinutes() {
  displayMinutes.addEventListener('focus', () => {
    displayMinutes.textContent = '';
    displaySeconds.textContent = '00';
  });

  displayMinutes.addEventListener('blur', () => {
    displayMinutes.contentEditable = false;
    let minutes = displayMinutes.textContent;
    if (typeof minutes === 'string' && minutes.trim().length === 0) {
      minutes = 25;
    } else if (isNaN(minutes)) {
      minutes = 25;
    }

    minutes = Number(minutes);
    if (minutes > 60) {
      minutes = 60;
    }

    state.minutes = minutes;
    state.seconds = 0;

    timer.updateDisplay();
    localStorage.setItem('minutes', minutes);
  });

  displayMinutes.onkeydown = (evt) => /\d/.test(evt.key);
}
