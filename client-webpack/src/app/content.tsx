import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Chat from '../pages/Chat';
import { ChatStyles } from '../styles/Global';
import { theme } from '../styles/Theme';

const actions = {
  INSERT_CHAT: 'INSERT_CHAT',
  REDIRECT_TO_EMBED: 'REDIRECT_TO_EMBED',
};

// TODO: Fix port error due to mishandling this async call.
chrome.runtime.onMessage.addListener(
  (
    request: any,
    sender: chrome.runtime.MessageSender,
    responseHandler: (response?: any) => void,
  ) => {
    switch (request.action) {
      case actions.INSERT_CHAT:
        createChatContainer();
        break;
      case actions.REDIRECT_TO_EMBED:
        redirectToVideoEmbed();
        break;
      default:
        createChatContainer();
    }
  },
);

const redirectToVideoEmbed = () => {
  const iFrame = document.getElementById('watch-embed') as HTMLIFrameElement;
  window.location.href = iFrame.src;
};

const createChatContainer = () => {
  const divMount = createDivElementWithId('criterion-chat-container');
  // setStylesForMountNode(divMount, chatStyles);
  document.body.appendChild(divMount);
  render(
    <ThemeProvider theme={theme}>
      <ChatStyles />
      <Chat />
    </ThemeProvider>,
    divMount,
  );
};

const setStylesForMountNode = (mountNode: any, styles: any) => {
  for (const [property, value] of Object.entries(styles)) {
    mountNode.style[property] = value;
  }
};

const createDivElementWithId = (id: string) => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  return el;
};
