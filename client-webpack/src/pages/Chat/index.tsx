import React, { useState, useEffect } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Audience from '../../components/Audience';
import Header from '../../components/Header';
import Message from '../../components/Message';
import { Film } from '../../types';
import useChromeStorage from '../../hooks/useChromeStorage';
import {
  createMessage,
  getPlayButton,
  getProgressBar,
  getStateOfFilm,
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
} from './styles';

interface ChatProps {
  film: Film;
}

const Chat = ({ film }: ChatProps) => {
  const [messageToSend, setMessageToSend] = useState('');
  const [hideChat, setHideChat] = useState(false);
  const { state, dispatch } = useChromeStorage();

  useEffect(() => {
    const handleVideoInteraction = (action: string) => {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: createMessage(
          state.currentUser,
          getStateOfFilm(action),
          false,
        ),
      });
    };
    const handlePlayPause = () => handleVideoInteraction('PLAY_PAUSE');
    const handleSkip = () => handleVideoInteraction('SKIP');

    const playBtn = getPlayButton();
    const progressBar = getProgressBar();
    const videoEl = getVideoEl();
    videoEl.addEventListener('click', handlePlayPause);
    playBtn.addEventListener('click', handlePlayPause);
    progressBar.addEventListener('click', handleSkip);

    return () => {
      videoEl.removeEventListener('click', handlePlayPause);
      playBtn.removeEventListener('click', handlePlayPause);
      progressBar.removeEventListener('click', handleSkip);
    };
  }, [state.currentUser.name]);

  useEffect(() => {
    if (state.messages.length) {
      scrollChatToBottom();
    }
  }, [state.messages.length]);

  const handleMessageAdd = () => {
    if (messageToSend.length) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: createMessage(state.currentUser, messageToSend),
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
      const sendButton = document.querySelector(
        '#chat-input-send',
      ) as HTMLElement;
      sendButton.click();
    }
  };

  return (
    <ChatWrapper hidden={hideChat}>
      <Header
        displayLink={false}
        displayUserIcon={true}
        userIconUrl={state.currentUser.icon?.url as string}
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
      <Audience />
    </ChatWrapper>
  );
};

export default Chat;
