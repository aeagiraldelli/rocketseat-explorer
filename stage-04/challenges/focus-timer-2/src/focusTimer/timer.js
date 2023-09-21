import state from './state.js';
import { displayMinutes, displaySeconds } from './elements.js';
import { actionStop } from './actions.js';
import * as sounds from './sounds.js';

let timer = null;

export function countdown() {
  if (!state.isRunning) {
    return;
  }

  let minutes = Number(displayMinutes.textContent);
  let seconds = Number(displaySeconds.textContent);

  seconds--;
  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }

  if (minutes < 0) {
    actionStop();
    sounds.kitchenTimer.play();
    return;
  }

  updateDisplay(minutes, seconds);
  if (timer === null) {
    timer = setTimeout(() => {
      timer = null;
      countdown();
    }, 1000);
  }
}

export function updateDisplay(minutes, seconds) {
  minutes = minutes ?? state.minutes;
  seconds = seconds ?? state.seconds;

  displayMinutes.textContent = String(minutes).padStart(2, '0');
  displaySeconds.textContent = String(seconds).padStart(2, '0');
}

export function addMinutes(minutes) {
  let currentMinutes = Number(displayMinutes.textContent);
  let seconds = Number(displaySeconds.textContent);

  if (minutes > 0) {
    currentMinutes += minutes;
  }

  if (currentMinutes > 60) {
    currentMinutes = 60;
  }

  updateDisplay(currentMinutes, seconds);
}

export function subtractMinutes(minutes) {
  let currentMinutes = Number(displayMinutes.textContent);
  let seconds = Number(displaySeconds.textContent);

  if (minutes > 0) {
    currentMinutes -= minutes;
  }

  if (currentMinutes < 0) {
    currentMinutes = 0;
  }

  updateDisplay(currentMinutes, seconds);
}
