import { faCheckCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input';
import IconImage from '../../components/IconImage';
import { copyToClipboard } from '../../utils';
import { iconsList } from '../../utils/mediaUtils';
import { sendMessageToContentScript } from '../../utils/chromeUtils';
import { UserIcon } from '../../types';
import {
  FontAwesomeIconWrapper,
  ProfileIconContainer,
  SetupFormWrapper,
  SetupWrapper,
  StyledButtonLink,
} from './styles';
import useChromeStorage from '../../hooks/useChromeStorage';

const Setup = () => {
  const { state, dispatch } = useChromeStorage();
  const { currentUser } = state;

  const handleUserNameChange = (name: string) =>
    dispatch({ type: 'SET_CURRENT_USER_NAME', payload: name });

  const handleCreateParty = async () => {
    if (!currentUser.name.length) {
      const { description } = currentUser.icon as UserIcon;
      handleUserNameChange(description);
    }
    let action = 'INSERT_CHAT';
    if (!state.isChatActive) {
      action = 'REDIRECT_TO_EMBED';
      dispatch({ type: 'SET_CHAT_ACTIVE', payload: true });
    } else {
      window.close();
    }
    await sendMessageToContentScript({
      action,
    });
  };

  return (
    <SetupWrapper>
      <h1>Choose your avatar.</h1>
      <ProfileIconContainer>
        {iconsList.map((icon, index) => (
          <div
            key={`icon_${index}`}
            onClick={() =>
              dispatch({ type: 'SET_CURRENT_USER_ICON', payload: icon })
            }
          >
            <IconImage size='md' src={icon.url} />
            <FontAwesomeIconWrapper
              className={currentUser.icon?.id === icon.id ? 'active' : ''}
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
          onChange={({ target }) => handleUserNameChange(target.value)}
          label='Enter a nickname'
          placeholder={currentUser.icon?.description}
          icon={faCheckCircle}
          autoComplete='off'
        />
        <Input
          id='url'
          name='url'
          label='Share a link to your party!'
          icon={faClipboard}
          onIconClick={() => copyToClipboard(state.partyUrl)}
          readOnly
          value={state.partyUrl}
        />
        <StyledButtonLink to='/setup' onClick={handleCreateParty}>
          {state.isChatActive ? 'Open Chat' : 'Start Party'}
        </StyledButtonLink>
      </SetupFormWrapper>
    </SetupWrapper>
  );
};

export default Setup;
