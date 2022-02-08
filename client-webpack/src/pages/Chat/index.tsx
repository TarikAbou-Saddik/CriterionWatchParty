import React, { useState, useEffect } from 'react';
import {
  faPaperPlane,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import Message from '../../components/Message';
import {
  getFilm,
  createMessage,
  getPlayButton,
  getStateOfFilm,
  fakeMessages,
  getUser,
} from './utils';
import {
  ChatContainer,
  ChatHeaderTitleWrapper,
  ChatHeaderWrapper,
  ChatInputWrapper,
  ChatInput,
  ChatInputSendButton,
  ChatInputSendButtonIcon,
  ChatMessagesWrapper,
  ChatWrapper,
  ChatHideButton,
  ChatHideButtonChevron,
} from './styles';
import { Film, IMessage, User } from '../../types';
import Audience from '../../components/Audience';
import Header from '../../components/Header';
import { staticCriterionLogo } from '../../utils/mediaUtils';

const Chat = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [messages, setMessages] = useState<IMessage[]>(fakeMessages);
  const [film, setFilm] = useState<Film>(getFilm());
  // TODO: This should come from chrome.storage.local.get()
  const [user, setUser] = useState<User>(getUser('TheCynicalEdge'));
  const [hideChat, setHideChat] = useState(false);

  useEffect(() => {
    const handleClick = ({ target }: { target: EventTarget | null }) => {
      const clickedEl = target as Element;
      if (clickedEl.matches('button.play')) {
        const message = `${user.name} has clicked play!`;
        setMessages(prev => [...prev, createMessage(user, message, false)]);
      }
    };
    // Grab the iFrame
    // const iFrame = document.getElementById('watch-embed') as HTMLIFrameElement;
    // const playBtn =
    //   iFrame.contentWindow?.document.querySelector('button.play') ||
    //   iFrame.contentDocument?.querySelector('button.play');
  }, []);

  useEffect(() => {
    if (messages.length) {
      scrollChatToBottom();
    }
  }, [messages]);

  const handleMessageAdd = () => {
    if (messageToSend.length) {
      setMessages(prev => [...prev, createMessage(user, messageToSend)]);
      setMessageToSend('');
      scrollChatToBottom();
    }
  };

  const scrollChatToBottom = () => {
    const scrollEl = document.querySelector('.chat-scroll') as HTMLElement;
    const lastMessage = scrollEl.lastElementChild as HTMLElement;
    scrollEl.scrollTo({
      top: scrollEl.scrollHeight + lastMessage.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleEnterKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const sendButton = document.querySelector(
        '#chat-input-send',
      ) as HTMLElement;
      sendButton.click();
    }
  };

  return (
    <ChatWrapper hidden={hideChat}>
      {/* <ChatHideButton onClick={() => setHideChat(prev => !prev)}>
        <ChatHideButtonChevron icon={faChevronCircleRight} />
      </ChatHideButton> */}
      <Header
        displayLink={false}
        displayUserIcon={true}
        userIconUrl={user.icon?.url as string}
        logoUrl={staticCriterionLogo}
      />
      <ChatContainer>
        <ChatHeaderWrapper>
          <p>You're currently watching...</p>
          <ChatHeaderTitleWrapper>
            <h1>{film?.title}</h1>
            <p>{film?.info}</p>
          </ChatHeaderTitleWrapper>
        </ChatHeaderWrapper>
        <ChatMessagesWrapper className='chat-scroll'>
          {messages.map((message, index) => (
            <Message key={`message_${index}`} {...message} />
          ))}
        </ChatMessagesWrapper>
        <ChatInputWrapper>
          <ChatInput
            id='chat-input'
            value={messageToSend}
            placeholder='Type a message...'
            onKeyUp={handleEnterKeyUp}
            onChange={({ target }) => setMessageToSend(target.value)}
            autoComplete='off'
          />
          <ChatInputSendButton id='chat-input-send' onClick={handleMessageAdd}>
            <ChatInputSendButtonIcon icon={faPaperPlane} />
          </ChatInputSendButton>
        </ChatInputWrapper>
      </ChatContainer>
      <Audience />
    </ChatWrapper>
  );
};

export default Chat;
