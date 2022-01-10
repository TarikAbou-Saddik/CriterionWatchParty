import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input';
import IconImage from '../../components/IconImage';
import ButtonLink from '../../components/ButtonLink';
import { iconsList, copyToClipboard, getPartyId } from '../../utils';
import {
  setPartyUrl,
  partyUrlSelect,
  toggleChatStatus,
} from '../../redux/partySlice';
import {
  setUsername,
  setUserIcon,
  userIconSelect,
  userNameSelect,
} from '../../redux/userSlice';

const Setup = () => {
  const dispatch = useDispatch();
  const userName = useSelector(userNameSelect);
  const partyUrl = useSelector(partyUrlSelect);
  const userIcon = useSelector(userIconSelect);

  useEffect(() => {
    dispatch(
      setPartyUrl(`${window.location.href}?criterionParty=${getPartyId()}`),
    );
  }, [dispatch]);

  return (
    <SetupWrapper>
      <h1>Choose your avatar.</h1>
      <ProfileIconContainer>
        {iconsList.map((icon, index) => (
          <div
            key={`icon_${index}`}
            onClick={() => dispatch(setUserIcon(icon))}
          >
            <IconImage size='md' src={icon.url} />
            <FontAwesomeIconWrapper
              className={userIcon.id === icon.id && 'active'}
              icon={faCheckCircle}
            />
          </div>
        ))}
      </ProfileIconContainer>
      <SetupFormWrapper>
        <Input
          id='nickname'
          name='nickname'
          value={userName}
          onChange={({ target }) => dispatch(setUsername(target.value))}
          label='Enter a nickname'
          placeholder={userIcon.description}
          icon={faCheckCircle}
          autocomplete='off'
        />
        <Input
          id='url'
          name='url'
          label='Share link to your party!'
          icon={faClipboard}
          placeholder={partyUrl}
          onIconClick={() => copyToClipboard(partyUrl)}
          readOnly
        />
        <StyledButtonLink
          to='/chat'
          onClick={() => dispatch(toggleChatStatus())}
        >
          Start party
        </StyledButtonLink>
      </SetupFormWrapper>
    </SetupWrapper>
  );
};

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  transform: translateX(-15px);
  font-size: 1.3rem;
  opacity: 0;
  &.active {
    opacity: 1;
  }
`;

const SetupWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4vh;

  & > h1 {
    margin-top: 10vh;
  }
`;

const SetupFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4vh;
`;

const StyledButtonLink = styled(ButtonLink)`
  margin: 0 auto;
`;

const ProfileIconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3vh;
  justify-items: center;
`;

export default Setup;
