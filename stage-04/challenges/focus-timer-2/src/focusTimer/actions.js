import state from './state.js';
import * as timer from './timer.js';
import { displayMinutes } from './elements.js';
import * as sounds from './sounds.js';

export function actionPlay() {
  state.isRunning = true;
  document.documentElement.classList.add('running');

  timer.countdown();
  sounds.buttonPressAudio.play();
}

export function actionStop() {
  state.isRunning = false;
  document.documentElement.classList.remove('running');
  timer.updateDisplay();
  sounds.buttonPressAudio.play();
}

export function actionPause() {
  state.isRunning = document.documentElement.classList.toggle('running');
  timer.countdown();
  sounds.buttonPressAudio.play();
}

export function actionTimer() {
  displayMinutes.contentEditable = true;
  displayMinutes.focus();
  sounds.buttonPressAudio.play();
}

export function actionMusicOff() {
  state.isMute = true;
  document.documentElement.classList.remove('music-on');
  sounds.backgroundAudio.pause();
  sounds.backgroundAudio.currentTime = 0;
}

export function actionMusicOn() {
  state.isMute = false;
  document.documentElement.classList.add('music-on');
  sounds.backgroundAudio.play();
}

export function actionAddTime() {
  timer.addMinutes(5);
}

export function actionMinusTime() {
  timer.subtractMinutes(5);
}
