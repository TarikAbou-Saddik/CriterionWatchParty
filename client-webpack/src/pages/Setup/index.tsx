import { useEffect, useState } from 'react';
import { faCheckCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input';
import IconImage from '../../components/IconImage';
import { iconsList, copyToClipboard } from '../../utils';
import {
  FontAwesomeIconWrapper,
  ProfileIconContainer,
  SetupFormWrapper,
  SetupWrapper,
  StyledButtonLink,
} from './styles';
import {
  getActiveTabUrl,
  sendMessageToContentScript,
} from '../../utils/chromeUtils';
import { User, UserIcon } from '../../types';

const initUser: User = {
  id: null,
  dateCreated: new Date(),
  name: '',
  icon: null,
};

const initIcon: UserIcon = { ...iconsList[0] };

const Setup = () => {
  const [currentUser, setCurrentUser] = useState<User>(initUser);
  const [selectedUserIcon, setSelectedUserIcon] = useState<UserIcon>(initIcon);
  const [partyUrl, setPartyUrl] = useState('');

  useEffect(() => {
    const setUrl = async () => {
      const tabUrl = (await getActiveTabUrl()) as string;
      // TODO: Remove this hard-coded example and add dynamic fetch of created id.
      const partyId = '12345';
      const partyUrl = partyId ? `${tabUrl}?criterionParty=${partyId}` : tabUrl;
      setPartyUrl(partyUrl);
    };
    setUrl();
  }, []);

  const handleCurrentUserChange = (key: string, value: any) => {
    setCurrentUser(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateParty = async () => {
    if (!currentUser.name.length) {
      handleCurrentUserChange('name', selectedUserIcon.description);
    }
    await sendMessageToContentScript({
      action: 'INSERT_CHAT',
    });
    // TODO: Set currentPage in chrome.storage
    window.close();
  };

  return (
    <SetupWrapper>
      <h1>Choose your avatar.</h1>
      <ProfileIconContainer>
        {iconsList.map((icon, index) => (
          <div key={`icon_${index}`} onClick={() => setSelectedUserIcon(icon)}>
            <IconImage size='md' src={icon.url} />
            <FontAwesomeIconWrapper
              className={selectedUserIcon.id === icon.id ? 'active' : ''}
              icon={faCheckCircle}
            />
          </div>
        ))}
      </ProfileIconContainer>
      <SetupFormWrapper>
        <Input
          id='nickname'
          name='nickname'
          value={currentUser.name}
          onChange={({ target }) =>
            handleCurrentUserChange('name', target.value)
          }
          label='Enter a nickname'
          placeholder={selectedUserIcon.description}
          icon={faCheckCircle}
          autoComplete='off'
        />
        <Input
          id='url'
          name='url'
          label='Share a link to your party!'
          icon={faClipboard}
          onIconClick={() => copyToClipboard(partyUrl)}
          readOnly
          value={partyUrl}
        />
        <StyledButtonLink to='/setup' onClick={handleCreateParty}>
          Start party
        </StyledButtonLink>
      </SetupFormWrapper>
    </SetupWrapper>
  );
};

export default Setup;
