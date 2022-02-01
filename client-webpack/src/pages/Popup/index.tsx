import Slider from '../../components/Slider';
import ButtonLink from '../../components/ButtonLink';
import {
  HomeWrapper,
  HeroControlContainer,
  HeroContainer,
  HeroText,
} from './styles';

interface PopupProps {
  isPartyCreated: boolean;
  isChatActive: boolean;
  restrictPartyControl: boolean;
  handleControl: () => void;
  handleSetup: (isExit: boolean) => void;
}

const Popup = ({
  isPartyCreated,
  isChatActive,
  handleSetup,
  restrictPartyControl,
  handleControl,
}: PopupProps) => {
  return (
    <HomeWrapper>
      {isPartyCreated ? (
        <HeroContainer>
          <HeroText align='center' fontWeight='bold'>
            Are you sure you want to leave the party?
          </HeroText>
          <ButtonLink to={isChatActive ? '/chat' : '/setup'}>
            Return to party
          </ButtonLink>
          <ButtonLink variant='danger' onClick={() => handleSetup(true)}>
            Leave party
          </ButtonLink>
        </HeroContainer>
      ) : (
        <HeroContainer>
          <HeroText fontWeight={400}>
            Watch the best of what <span>The Criterion Collection</span> has to
            offer along with your friends and family.
          </HeroText>
          <HeroControlContainer>
            Restrict party control
            <Slider active={restrictPartyControl} onClick={handleControl} />
          </HeroControlContainer>
          <ButtonLink to='/setup' onClick={() => handleSetup(false)}>
            Create a party
          </ButtonLink>
          <footer>
            For this extension to work, you are required to be a subscriber of
            The Criterion Channel. You must also inform your guests that they
            must download this extension off the Chrome Extensions store.
          </footer>
        </HeroContainer>
      )}
    </HomeWrapper>
  );
};

export default Popup;
