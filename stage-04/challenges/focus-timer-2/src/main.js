import './theme.js';
import * as FocusTimer from './focusTimer/focus-timer.js';

const minutes = localStorage.getItem('minutes');

if (minutes) {
  FocusTimer.start(Number(minutes), 0);
} else {
  FocusTimer.start(25, 0);
}
