import { User, IMessage, Film } from 'Types/';
import { iconsListStatic as iconsList } from 'Utils/mediaUtils';

export const getPlayButton = () => getElement('button.play') as HTMLElement;
export const playPause = () => getPlayButton().click();

export const getProgressBar = () =>
  getElement('div.vp-progress') as HTMLElement;

export const getVideoEl = () => getElement('div.vp-target') as HTMLVideoElement;

export const getStateOfFilm = (state: string) => {
  const timestamp = getFilmTimestamp();
  switch (state) {
    case 'SKIP':
      return `Skipped the movie to ${timestamp}`;
    case 'PLAY_PAUSE':
      return isPlaying()
        ? `Resumed playing the movie`
        : `Paused the movie at ${timestamp}`;
    default:
      return '';
  }
};

export const getFilm = (): Film => ({
  title: getFilmTitle(),
  timestamp: getFilmTimestamp(),
  info: getFilmInfo(),
});

export const createMessage = (
  user: User,
  data: string,
  isUserMessage = true,
): IMessage => ({
  id: null,
  user,
  data,
  isUserMessage,
  timestamp: getShortTime(),
});

const getFilmTimestamp = () => {
  const el = getElement('div.timecode > .box') as HTMLElement | null;
  if (el) {
    return el.innerText;
  }
  return el;
};

const getFilmTitle = () =>
  (getElement('h1.video-title') as HTMLElement).innerText;

const getFilmInfo = () =>
  (getElement('.read-more-wrap > p') as HTMLElement).innerText.split('\n')[0];

const isPlaying = () => {
  const STATE_PAUSED = 'state-paused';
  const { classList } = getPlayButton();
  return classList.contains(STATE_PAUSED);
};

const getElement = (stringSelector: string) => {
  try {
    const el = document.querySelector(stringSelector);
    if (el) {
      return el;
    }
    throw new Error(
      `document.querySelector(${stringSelector}) returned null. Element does not exist.`,
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getShortTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const getUser = (name: string, icon = iconsList[0]) => ({
  id: null,
  dateCreated: null,
  name,
  icon,
});

export const fakeMessages: IMessage[] = [
  {
    user: getUser('TheCynicalEdge', iconsList[0]),
    data: 'Created the session',
    isUserMessage: false,
    timestamp: getShortTime(),
  },
  {
    user: getUser('TheCynicalEdge', iconsList[0]),
    data: 'Jumped to 8:14',
    isUserMessage: false,
    timestamp: getShortTime(),
  },
  {
    user: getUser('TheCynicalEdge', iconsList[0]),
    data: 'Started playing the movie.',
    isUserMessage: false,
    timestamp: getShortTime(),
  },
  {
    user: getUser('TheCynicalEdge', iconsList[0]),
    data: 'Paused the movie',
    isUserMessage: false,
    timestamp: getShortTime(),
  },
  {
    user: getUser('Brigitte Lin', iconsList[0]),
    data: 'Joined the party.',
    isUserMessage: false,
    timestamp: getShortTime(),
  },
  {
    user: getUser('Brigitte Lin', iconsList[3]),
    data: 'Started playing the movie.',
    isUserMessage: false,
    timestamp: getShortTime(),
  },
  {
    user: getUser('Brigitte Lin', iconsList[3]),
    data: "I've heard of this movie!",
    isUserMessage: true,
    timestamp: getShortTime(),
  },
  {
    user: getUser('Brigitte Lin', iconsList[3]),
    data: "It's a classic!",
    isUserMessage: true,
    timestamp: getShortTime(),
  },
  {
    user: getUser('Brigitte Lin', iconsList[3]),
    data: 'Orson Welles is in it too!',
    isUserMessage: true,
    timestamp: getShortTime(),
  },
];
