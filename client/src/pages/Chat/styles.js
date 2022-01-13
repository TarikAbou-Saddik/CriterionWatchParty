import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ChatContainer = styled.section``;

export const ChatHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;

  & > p {
    font-style: italic;
    margin-top: 8vh;
  }
`;

export const ChatHeaderTitleWrapper = styled.div`
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

export const ChatMessagesWrapper = styled.div`
  height: 40vh;
  margin: 3vh 0;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  overflow-y: scroll;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
  border-bottom: 1px solid white;
  padding: 5px 10px;
`;

export const ChatInput = styled.input`
  width: 90%;
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

export const ChatInputSendButton = styled.div`
  cursor: pointer;
`;

export const ChatInputSendButtonIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.textPrimary};
  }
`;
