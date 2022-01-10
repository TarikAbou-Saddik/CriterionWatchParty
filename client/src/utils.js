import JPB from './assets/JPB.svg';
import antonine from './assets/antoine.svg';
import brigitte from './assets/brigitte.svg';
import karina from './assets/karina.svg';
import marcello from './assets/marcello.svg';
import walken from './assets/walken.svg';
import { v4 as uuid } from 'uuid';

// FOR TESTING PURPOSES
export const iconsList = [
  { id: 1, url: JPB, description: 'Jean Paul Belmondo' },
  { id: 2, url: antonine, description: 'Antoine Doinel' },
  { id: 3, url: brigitte, description: 'Brigitte Lin' },
  { id: 4, url: karina, description: 'Ana Karina' },
  { id: 5, url: marcello, description: 'Marcello Mastroianni' },
  { id: 6, url: walken, description: 'Christopher Walken' },
];

export const iconsListUrls = iconsList.map(icon => icon.url);

export const getPartyId = () => uuid();

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

export const playPause = () => getPlayButton().click();

export const getTimestamp = () =>
  document.querySelector('div.timecode > .box').innerText;

export const getFilmTitle = () =>
  document.querySelector('h1.video-title').innerText;

const getPlayButton = () => document.querySelector('button.play');
