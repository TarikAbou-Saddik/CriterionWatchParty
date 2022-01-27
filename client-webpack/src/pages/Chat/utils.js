import { iconsList } from '../../utils';

// Methods used to fetch DOM elements.
export const getPlayButton = () => document.querySelector('button.play');

export const getFilm = () => ({
  title: getFilmTitle(),
  timestamp: getFilmTimestamp(),
  info: getFilmInfo(),
});

export const getStateOfFilm = () =>
  isPlaying() ? 'Started playing the movie.' : 'Paused the movie';

const getFilmTimestamp = () =>
  document.querySelector('div.timecode > .box').innerText;

const getFilmTitle = () => document.querySelector('h1.video-title').innerText;

const getFilmInfo = () =>
  document.querySelector('.read-more-wrap > p').innerText.split('\n')[0];

const STATE_PLAYING = 'state-playing';
// const STATE_PAUSED = 'state-paused';

const isPlaying = () => {
  const { classList } = getPlayButton();
  return classList.contains(STATE_PLAYING);
};

// const isPaused = () => {
//   const { classList } = getPlayButton();
//   return classList.contains(STATE_PAUSED);
// };

export const playPause = () => getPlayButton().click();

const DEBUG_ICON_URL_1 = iconsList[0].url;
const DEBUG_ICON_URL_2 = iconsList[2].url;

export const filmInfo = {
  title: 'The Third Man',
  director: 'Carol Reed',
  year: 1949,
  country: 'United Kingdom',
};

const getShortTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const createMessage = (user, data, isUserMessage = true) => ({
  user,
  data,
  isUserMessage,
  timestamp: getShortTime(),
});

export const fakeMessages = [
  {
    userName: 'TheCynicalEdge',
    profileImage: DEBUG_ICON_URL_1,
    data: 'Created the session',
    isMessage: false,
    timestamp: getShortTime(),
  },
  {
    userName: 'TheCynicalEdge',
    profileImage: DEBUG_ICON_URL_1,
    data: 'Jumped to 8:14',
    isMessage: false,
    timestamp: getShortTime(),
  },
  {
    userName: 'TheCynicalEdge',
    profileImage: DEBUG_ICON_URL_1,
    data: 'Started playing the movie.',
    isMessage: false,
    timestamp: getShortTime(),
  },
  {
    userName: 'TheCynicalEdge',
    profileImage: DEBUG_ICON_URL_1,
    data: 'Paused the movie',
    isMessage: false,
    timestamp: getShortTime(),
  },
  {
    userName: 'Brigitte Lin',
    profileImage: DEBUG_ICON_URL_2,
    data: 'Joined the party.',
    isMessage: false,
    timestamp: getShortTime(),
  },
  {
    userName: 'Brigitte Lin',
    profileImage: DEBUG_ICON_URL_2,
    data: 'Started playing the movie.',
    isMessage: false,
    timestamp: getShortTime(),
  },
  {
    userName: 'Brigitte Lin',
    profileImage: DEBUG_ICON_URL_2,
    data: "I've heard of this movie!",
    isMessage: true,
    timestamp: getShortTime(),
  },
  {
    userName: 'Brigitte Lin',
    profileImage: DEBUG_ICON_URL_2,
    data: "It's a classic!",
    isMessage: true,
    timestamp: getShortTime(),
  },
  {
    userName: 'Brigitte Lin',
    profileImage: DEBUG_ICON_URL_2,
    data: 'Orson Welles is in it too!',
    isMessage: true,
    timestamp: getShortTime(),
  },
];
