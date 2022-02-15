import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ChatWrapper = styled.main`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textPrimary};
  padding: 5vh;
  height: 100vh;
  width: 25%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  transform: ${({ hidden }) => (hidden ? 'translateX(100%)' : 'translateX(0)')};
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
`;

export const ChatHideButton = styled(FontAwesomeIcon)``;
export const ChatContainer = styled.section``;

export const ChatHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;

  & > p {
    font-style: italic;
    margin-top: 3vh;
  }
`;

export const ChatHeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;

  & h1 {
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 700;
    font-size: 1.8rem;
  }
`;

type ChatHeaderFilmInfoProps = {
  shortenSize?: boolean;
};
export const ChatHeaderFilmInfo = styled.p<ChatHeaderFilmInfoProps>`
  font-size: ${({ shortenSize }) => (shortenSize ? '0.7rem' : '0.9rem')};
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
