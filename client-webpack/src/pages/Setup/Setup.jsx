import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input';
import IconImage from '../../components/IconImage';
import ButtonLink from '../../components/ButtonLink';
import {
  setPartyUrl,
  partyUrlSelect,
  setChatStatus,
  addMember,
} from '../../redux/partySlice/partySlice';
import {
  setUsername,
  setUserIcon,
  userIconSelect,
} from '../../redux/userSlice';
import { iconsList, copyToClipboard } from '../../utils';

const Setup = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const partyId = useSelector(state => state.party.id);
  const partyUrl = useSelector(partyUrlSelect);
  const userIcon = useSelector(userIconSelect);

  useEffect(() => {
    dispatch(addMember(user));
    dispatch(setPartyUrl(`${window.location.href}?criterionParty=${partyId}`));
  }, [dispatch, user, partyId]);

  const onCreatePartyHandler = () => {
    if (!user.name.length) {
      dispatch(setUsername(userIcon.description));
    }
    dispatch(setChatStatus(true));
  };

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
          value={user.name}
          onChange={({ target }) => dispatch(setUsername(target.value))}
          label='Enter a nickname'
          placeholder={userIcon.description}
          icon={faCheckCircle}
          autoComplete='off'
        />
        <Input
          id='url'
          name='url'
          label='Share a link to your party!'
          icon={faClipboard}
          placeholder={partyUrl}
          onIconClick={() => copyToClipboard(partyUrl)}
          readOnly
        />
        <StyledButtonLink to='/chat' onClick={onCreatePartyHandler}>
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
    margin-top: 4vh;
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
