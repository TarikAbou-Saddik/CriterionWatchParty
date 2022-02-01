import styled from 'styled-components';
import IconImage from '../IconImage';

const Message = ({ user, isUserMessage, data, timestamp }) => {
  return (
    <MessageWrapper>
      <IconImage src={user.icon.url} size='sm' disabled />
      <MessageDataWrapper>
        <MessageUserNameWrapper>
          <h5>{user.name}</h5>
          <span>{timestamp}</span>
        </MessageUserNameWrapper>
        <MessageText isMessage={isUserMessage}>{data}</MessageText>
      </MessageDataWrapper>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  display: flex;
  gap: 1.5vw;
`;

const MessageDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`;

const MessageUserNameWrapper = styled.div`
  display: flex;
  gap: 0.5vw;
  align-items: center;

  & h5 {
    font-size: 0.95rem;
  }

  & span {
    font-size: 0.6rem;
  }
`;

const MessageText = styled.p`
  font-size: 0.8rem;
  color: ${({ isMessage, theme }) =>
    isMessage ? theme.textPrimary : theme.textSecondary};
  font-style: ${({ isMessage }) => (isMessage ? 'normal' : 'italic')};
`;

export default Message;
