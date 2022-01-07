import styled from 'styled-components';
import IconImage from '../IconImage';

const Message = ({ profileImage, userName, isMessage, data }) => {
  const getShortTime = () =>
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <MessageWrapper>
      <IconImage src={profileImage} size='sm' disabled />
      <MessageDataWrapper>
        <MessageUserNameWrapper>
          <h5>{userName}</h5>
          <span>{getShortTime()}</span>
        </MessageUserNameWrapper>
        <MessageText isMessage={isMessage}>{data}</MessageText>
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
