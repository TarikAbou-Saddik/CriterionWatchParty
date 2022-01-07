import JPB from './assets/JPB.svg';
import antonine from './assets/antoine.svg';
import brigitte from './assets/brigitte.svg';
import karina from './assets/karina.svg';
import marcello from './assets/marcello.svg';
import walken from './assets/walken.svg';

export const icons = {
  JPB,
  antonine,
  brigitte,
  karina,
  marcello,
  walken,
};

export const iconsList = Object.values(icons);

export const copyToClipboard = textValue =>
  navigator.clipboard.writeText(textValue).catch(err => console.log(err));

export const STATE_PLAYING = 'state-playing';
export const STATE_PAUSED = 'state-paused';

export const isPlaying = () => {
  const { classList } = getPlayButton();
  return classList.contains(STATE_PLAYING);
};

export const isPaused = () => {
  const { classList } = getPlayButton();
  return classList.contains(STATE_PAUSED);
};

export const playOrPause = () => getPlayButton().click();

export const getTimestamp = () =>
  document.querySelector('div.timecode > .box').innerText;

export const getFilmTitle = () =>
  document.querySelector('h1.video-title').innerText;

const getPlayButton = () => document.querySelector('button.play');
