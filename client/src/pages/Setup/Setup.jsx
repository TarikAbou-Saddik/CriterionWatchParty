import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input';
import IconImage from '../../components/IconImage';
import ButtonLink from '../../components/ButtonLink';
import { iconsList, copyToClipboard } from '../../utils';

const Setup = () => {
  const [partyUrl, setPartyUrl] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(0);

  useEffect(() => {
    const partyId = 'a50a5d25-e7a8-4238-baa1-8339493dd28d';
    setPartyUrl(`${window.location.href}?criterionParty=${partyId}`);
  }, []);

  return (
    <SetupWrapper>
      <h1>Choose your avatar.</h1>
      <ProfileIconContainer>
        {iconsList.map((icon, index) => (
          <div key={`icon_${index}`} onClick={() => setSelectedIcon(index)}>
            <IconImage size='md' src={icon} />
            <FontAwesomeIconWrapper
              className={selectedIcon === index && 'active'}
              icon={faCheckCircle}
            />
          </div>
        ))}
      </ProfileIconContainer>
      <SetupFormWrapper>
        <Input
          id='nickname'
          name='nickname'
          value={userNickname}
          onChange={({ target }) => setUserNickname(target.value)}
          label='Enter a nickname'
          placeholder='Jean Paul Belmondo'
          icon={faCheckCircle}
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
        <StyledButtonLink to='/chat'>Start party</StyledButtonLink>
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
