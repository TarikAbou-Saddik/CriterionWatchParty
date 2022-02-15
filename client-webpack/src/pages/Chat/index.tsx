import React, { useState, useEffect, useMemo } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Header from 'Components/Header';
import Message from 'Components/Message';
import Audience from 'Components/Audience';
import useChromeStorage from 'Hooks/useChromeStorage';
import { Film } from 'Types/';
import {
  createMessage,
  getPlayButton,
  getPlayerBackgroundAndContainer,
  getProgressBar,
  getStateOfFilm,
  getStylesMutationObserver,
  getVideoEl,
} from './utils';
import { staticCriterionLogo } from '../../utils/mediaUtils';
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
  ChatHeaderFilmInfo,
} from './styles';

interface ChatProps {
  film: Film;
}

const Chat = ({ film }: ChatProps) => {
  const [messageToSend, setMessageToSend] = useState('');
  const { state, dispatch } = useChromeStorage();
  const currentUser = state.users[0];

  useEffect(() => {
    const handleVideoInteraction = (action: string) => {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: createMessage(currentUser, getStateOfFilm(action), false),
      });
    };

    const handlePlayPause = () => handleVideoInteraction('PLAY_PAUSE');
    const handleSkip = () => handleVideoInteraction('SKIP');

    const playBtn = getPlayButton();
    const progressBar = getProgressBar();
    const videoEl = getVideoEl();
    const [backgroundEl, containerEl] = getPlayerBackgroundAndContainer();
    backgroundEl.style.width = '75%';
    containerEl.style.width = '100%';
    backgroundEl.style.transition = 'all 0.6s ease-in';
    backgroundEl.style.transitionProperty = 'width height';
    const { config, observer } = getStylesMutationObserver();
    observer.observe(containerEl, config);

    videoEl.addEventListener('click', handlePlayPause);
    playBtn.addEventListener('click', handlePlayPause);
    progressBar.addEventListener('click', handleSkip);

    return () => {
      videoEl.removeEventListener('click', handlePlayPause);
      playBtn.removeEventListener('click', handlePlayPause);
      progressBar.removeEventListener('click', handleSkip);
      observer.disconnect();
    };
  }, [currentUser.name]);

  useEffect(() => {
    if (state.messages.length) {
      scrollChatToBottom();
    }
  }, [state.messages.length]);

  const handleMessageAdd = () => {
    if (messageToSend.length) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: createMessage(currentUser, messageToSend),
      });
      setMessageToSend('');
      scrollChatToBottom();
    }
  };

  const scrollChatToBottom = () => {
    const scrollEl = document.querySelector('.chat-scroll');
    if (scrollEl) {
      const lastMessage = scrollEl.lastElementChild;
      if (lastMessage) {
        scrollEl.scrollTo({
          top: scrollEl.scrollHeight + lastMessage.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleEnterKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleMessageAdd();
    }
  };

  const memberIconUrls = useMemo(() => {
    return state.users.map(user => user.icon?.url as string);
  }, [state.users]);

  return (
    <ChatWrapper id='chat-wrapper'>
      <Header
        displayLink={false}
        displayUserIcon={true}
        userIconUrl={currentUser.icon?.url as string}
        logoUrl={staticCriterionLogo}
      />
      <ChatContainer>
        <ChatHeaderWrapper>
          <p>You're currently watching...</p>
          <ChatHeaderTitleWrapper>
            <h1>{film?.title}</h1>
            <ChatHeaderFilmInfo shortenSize={film?.info.length > 90}>
              {film?.info}
            </ChatHeaderFilmInfo>
          </ChatHeaderTitleWrapper>
        </ChatHeaderWrapper>
        <ChatMessagesWrapper className='chat-scroll'>
          {state.messages.map((message, index) => (
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
      <Audience memberIconsUrls={memberIconUrls} />
    </ChatWrapper>
  );
};

export default Chat;
