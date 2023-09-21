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

export function actionPlayRainBackground() {
  if (sounds.bgRain.paused) {
    pauseAllAmbientBackgrounds();
    sounds.bgRain.play();
    setButtonActive('btn-play-rain');
  } else {
    pauseAllAmbientBackgrounds();
    setButtonActive('btn-play-rain', false);
  }
}

export function actionPlayFireplaceBackground() {
  if (sounds.bgFireplace.paused) {
    pauseAllAmbientBackgrounds();
    sounds.bgFireplace.play();
    setButtonActive('btn-play-fireplace');
  } else {
    pauseAllAmbientBackgrounds();
    setButtonActive('btn-play-fireplace', false);
  }
}

export function actionPlayCafeBackground() {
  if (sounds.bgCafe.paused) {
    pauseAllAmbientBackgrounds();
    sounds.bgCafe.play();
    setButtonActive('btn-play-cafe');
  } else {
    pauseAllAmbientBackgrounds();
    setButtonActive('btn-play-cafe', false);
  }
}

export function actionPlayForestBackground() {
  if (sounds.bgForest.paused) {
    pauseAllAmbientBackgrounds();
    sounds.bgForest.play();
    setButtonActive('btn-play-forest');
  } else {
    pauseAllAmbientBackgrounds();
    setButtonActive('btn-play-forest', false);
  }
}

function pauseAllAmbientBackgrounds() {
  const backgrounds = [sounds.bgCafe, sounds.bgFireplace, sounds.bgForest, sounds.bgRain];
  backgrounds.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function setButtonActive(buttonId, active = true) {
  const btn = document.getElementById(`${buttonId}`);
  const btnPlayRain = document.getElementById('btn-play-rain');
  const btnPlayForest = document.getElementById('btn-play-forest');
  const btnPlayCafe = document.getElementById('btn-play-cafe');
  const btnPlayFireplace = document.getElementById('btn-play-fireplace');

  const buttons = [btnPlayCafe, btnPlayFireplace, btnPlayForest, btnPlayRain];
  buttons.forEach((button) => button.classList.remove('btn-play-active'));

  if (active) {
    btn.classList.add('btn-play-active');
  } else {
    btn.classList.remove('btn-play-active');
  }
}
