import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Message from '../../components/Message';
import { messagesSelect, addMessage } from '../../redux/partySlice/partySlice';
import {
  filmInfo,
  createMessage,
  getPlayButton,
  getStateOfFilm,
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
} from './styles';
import { getBotUser, iconsListUrls } from '../../utils';
import { RootState, useAppDispatch } from '../../app/store';
import Header from '../../components/Header';

const userIconUrl = iconsListUrls[0];

const Chat = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  // const dispatch = useAppDispatch();
  // const user = useSelector((state: RootState) => state.user);
  // const messages = useSelector(messagesSelect);

  // useEffect(() => {
  //   const handlePlayOrPause = (event: any) => {
  //     event.preventDefault();
  //     dispatch(
  //       addMessage(createMessage(getBotUser(), getStateOfFilm(), false)),
  //     );
  //   };

  //   const playBtn = getPlayButton();
  //   if (playBtn) {
  //     playBtn.addEventListener('click', handlePlayOrPause);
  //   }
  // }, [dispatch]);

  useEffect(() => {
    if (messages.length) {
      scrollChatToBottom();
    }
  }, [messages]);

  const handleMessageAdd = () => {
    if (messageToSend.length) {
      // dispatch(addMessage(createMessage(user, messageToSend)));
      setMessages((prev: string[]) => [...prev, messageToSend]);
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
    <>
      <ChatContainer>
        <ChatHeaderWrapper>
          <p>You're currently watching...</p>
          <ChatHeaderTitleWrapper>
            <h1>{filmInfo.title}</h1>
            <p>
              {`Directed by ${filmInfo.director} · ${filmInfo.year} · ${filmInfo.country}`}
            </p>
          </ChatHeaderTitleWrapper>
        </ChatHeaderWrapper>
        <ChatMessagesWrapper className='chat-scroll'>
          {messages.map((message, index) => (
            // <Message key={`message_${index}`} {...message} />
            <p key={`message_${index}`}>{message}</p>
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
    </>
  );
};

export default Chat;
