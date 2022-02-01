import { User, Message, Film } from '../../types';
import { iconsList } from '../../utils';

export const getPlayButton = () => getElement('button.play') as HTMLElement;
export const playPause = () => getPlayButton().click();

export const getStateOfFilm = () =>
  isPlaying() ? 'Started playing the movie.' : 'Paused the movie';

export const getFilm = (): Film => ({
  title: getFilmTitle(),
  timestamp: getFilmTimestamp(),
  info: getFilmInfo(),
});

export const createMessage = (
  user: User,
  data: string,
  isUserMessage = true,
): Message => ({
  id: null,
  user,
  data,
  isUserMessage,
  timestamp: getShortTime(),
});

const getFilmTimestamp = () =>
  (getElement('div.timecode > .box') as HTMLElement).innerText;

const getFilmTitle = () =>
  (getElement('h1.video-title') as HTMLElement).innerText;

const getFilmInfo = () =>
  (getElement('.read-more-wrap > p') as HTMLElement).innerText.split('\n')[0];

const isPlaying = () => {
  const STATE_PLAYING = 'state-playing';
  const { classList } = getPlayButton();
  return classList.contains(STATE_PLAYING);
};

const getElement = (stringSelector: string) => {
  try {
    const el = document.querySelector(stringSelector);
    if (el) {
      return el;
    }
    throw new Error(
      `document.querySelector(${stringSelector}) return null. Element does not exist.`,
    );
  } catch (error) {
    console.error(error);
  }
};

const getShortTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

// ========================= DEBUG ====================================
// TODO: GET RID OF THIS EVENTUALLY

const DEBUG_ICON_URL_1 = iconsList[0].url;
const DEBUG_ICON_URL_2 = iconsList[2].url;

export const filmInfo = {
  title: 'The Third Man',
  director: 'Carol Reed',
  year: 1949,
  country: 'United Kingdom',
};

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
