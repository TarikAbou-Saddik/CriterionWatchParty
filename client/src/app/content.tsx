import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Chat from 'Pages/Chat';
import { ChatStyles } from '../styles/Global';
import { theme } from '../styles/Theme';
import { Film } from 'Types/';

const actions = {
  INSERT_CHAT: 'INSERT_CHAT',
  REDIRECT_TO_EMBED: 'REDIRECT_TO_EMBED',
};

chrome.runtime.onMessage.addListener(
  (
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ) => {
    switch (request.action) {
      case actions.INSERT_CHAT:
        createChatContainer();
        break;
      default:
        createChatContainer();
    }
    sendResponse();
    return true;
  },
);

const createChatContainer = () => {
  const divMount = createDivElementWithId('criterion-chat-container');
  document.body.appendChild(divMount);
  createLinkElementsForFont();
  render(
    <ThemeProvider theme={theme}>
      <ChatStyles />
      <Chat film={getFilm()} />
    </ThemeProvider>,
    divMount,
  );
};

const getFilm = (): Film => ({
  title: getFilmTitle(),
  // timestamp: getFilmTimestamp(),
  timestamp: '',
  info: getFilmInfo(),
});

const getFilmTitle = () => {
  const filmTitle = document.querySelector('h1.video-title') as HTMLElement;
  if (filmTitle) {
    return filmTitle.innerText;
  }
  return '';
};

const getFilmInfo = () => {
  const filmInfo = (document.querySelector('.read-more-wrap > p') ||
    document.querySelector('#watch-info p')) as HTMLElement;
  if (filmInfo) {
    return filmInfo.innerText.split('\n')[0];
  }
  return '';
};

const createDivElementWithId = (id: string) => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  return el;
};

const createLinkElementsForFont = () => {
  const head = document.head || document.getElementsByTagName('head')[0];
  const hrefs = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap',
  ];
  head.appendChild(createLinkElement(hrefs[0], 'preconnect'));
  head.appendChild(createLinkElement(hrefs[1], 'preconnect'));
  head.appendChild(createLinkElement(hrefs[2], 'stylesheet'));
};

const createLinkElement = (href: string, rel: string) => {
  const link = document.createElement('link');
  link.href = href;
  link.rel = rel;
  return link;
};
