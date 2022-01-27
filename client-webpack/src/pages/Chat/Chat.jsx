import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Message from '../../components/Message';
import { messagesSelect, addMessage } from '../../redux/partySlice/partySlice';
import {
  filmInfo,
  createMessage,
  getPlayButton,
  getFilm,
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
import { getBotUser } from '../../utils';

const Chat = () => {
  const [film, setFilm] = useState({});
  const [messageToSend, setMessageToSend] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const messages = useSelector(messagesSelect);

  useEffect(() => {
    // DOM elements
    const chatInputField = document.querySelector('#chat-input');
    const playBtn = getPlayButton();

    // Event handlers.
    const handleEnterKeyUp = event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('#chat-input-send').click();
      }
    };

    const handlePlayOrPause = event => {
      event.preventDefault();
      dispatch(
        addMessage(createMessage(getBotUser(), getStateOfFilm(), false)),
      );
    };

    // Event listeners.
    chatInputField.addEventListener('keyup', handleEnterKeyUp);
    if (playBtn) {
      playBtn.addEventListener('click', handlePlayOrPause);
      setFilm(getFilm());
    }
  }, [dispatch]);

  useEffect(() => {
    if (messages.length) {
      scrollChatToBottom();
    }
  }, [messages]);

  const handleMessageAdd = () => {
    if (messageToSend.length) {
      dispatch(addMessage(createMessage(user, messageToSend)));
      setMessageToSend('');
      scrollChatToBottom();
    }
  };

  const scrollChatToBottom = () => {
    const scrollEl = document.querySelector('.chat-scroll');
    const lastMessage = document.querySelector('.chat-scroll').lastElementChild;
    scrollEl.scrollTo({
      top: scrollEl.scrollHeight + lastMessage.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <ChatContainer>
      <ChatHeaderWrapper>
        <p>You're currently watching...</p>
        <ChatHeaderTitleWrapper>
          <h1>{film.title || filmInfo.title}</h1>
          <p>
            {film.info ||
              `Directed by ${filmInfo.director} · ${filmInfo.year} · ${filmInfo.country}`}
          </p>
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
          onChange={({ target }) => setMessageToSend(target.value)}
          autoComplete='off'
        />
        <ChatInputSendButton id='chat-input-send' onClick={handleMessageAdd}>
          <ChatInputSendButtonIcon icon={faPaperPlane} />
        </ChatInputSendButton>
      </ChatInputWrapper>
    </ChatContainer>
  );
};

export default Chat;
