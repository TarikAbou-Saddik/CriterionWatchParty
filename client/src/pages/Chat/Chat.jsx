import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Message from '../../components/Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { filmInfo, fakeMessages, createMessage } from './utils';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState('');

  useEffect(() => {
    const handleEnterKeyUp = event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('#chat-input-send').click();
      }
    };
    const chatInputField = document.querySelector('#chat-input');
    chatInputField.addEventListener('keyup', handleEnterKeyUp);
    // Here, we would be setting the messages array based on WebSocket connection.
    setMessages(fakeMessages);
  }, []);

  useEffect(() => {
    if (messages.length) {
      scrollChatToBottom();
    }
  }, [messages]);

  const handleMessageAdd = () => {
    if (messageToSend.length) {
      setMessages(prevMessages => [
        ...prevMessages,
        createMessage(messageToSend),
      ]);
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
          <h1>{filmInfo.title}</h1>
          <p>{`Directed by ${filmInfo.director} · ${filmInfo.year} · ${filmInfo.country}`}</p>
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

const ChatContainer = styled.section``;

const ChatHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;

  & > p {
    font-style: italic;
    margin-top: 8vh;
  }
`;

const ChatHeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;

  & h1 {
    font-size: 1.8rem;
  }

  & p {
    font-size: 0.8rem;
  }
`;

const ChatMessagesWrapper = styled.div`
  height: 40vh;
  margin: 3vh 0;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  overflow-y: scroll;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
  border-bottom: 1px solid white;
  padding: 5px 10px;
`;

const ChatInput = styled.input`
  width: 100%;
  &:focus {
    outline: none;
  }
  border: none;
  height: 3vh;
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ theme }) => theme.bg};
  padding: 20px 5px;
  font-size: 1rem;
`;

const ChatInputSendButton = styled.div`
  cursor: pointer;
`;

const ChatInputSendButtonIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export default Chat;
