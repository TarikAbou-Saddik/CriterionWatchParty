import { render } from 'react-dom';
import Chat from '../pages/Chat';

const actions = {
  INSERT_CHAT: 'INSERT_CHAT',
};

const chatStyles = {
  background: '#191919',
  height: '100vh',
  width: '20%',
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  zIndex: 100,
  color: '#fff',
  padding: '5vh',
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case actions.INSERT_CHAT:
      createChatContainer();
      break;
    default:
      createChatContainer();
  }
});

const createChatContainer = () => {
  const divMount = createDivElementWithId('criterion-chat-container');
  setStylesForMountNode(divMount, chatStyles);
  document.body.appendChild(divMount);
  render(<Chat />, divMount);
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
