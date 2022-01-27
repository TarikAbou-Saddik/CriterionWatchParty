import { useDispatch, useSelector } from 'react-redux';
import Slider from '../../components/Slider';
import ButtonLink from '../../components/ButtonLink';
import { setPartyRestriction } from '../../redux/partySlice/thunks';
import { restrictPartyControlSelect } from '../../redux/partySlice/partySlice';
import {
  HomeWrapper,
  HeroControlContainer,
  HeroContainer,
  HeroText,
} from './styles';

const isChatActive = false;
const isPartyCreated = false;

const Popup = () => {
  const dispatch = useDispatch();
  const restrictPartyControl = useSelector(restrictPartyControlSelect);

  const handleCreateParty = () => {};
  const handlePartyExit = () => {};

  const initSection = (
    <HeroContainer>
      <HeroText fontWeight={400}>
        Watch the best of what <span>The Criterion Collection</span> has to
        offer along with your friends and family.
      </HeroText>
      <HeroControlContainer>
        Restrict party control
        <Slider
          active={restrictPartyControl}
          onClick={() => dispatch(setPartyRestriction(!restrictPartyControl))}
        />
      </HeroControlContainer>
      <ButtonLink to='/setup' onClick={handleCreateParty}>
        Create a party
      </ButtonLink>
      <footer>
        For this extension to work, you are required to be a subscriber of The
        Criterion Channel. You must also inform your guests that they must
        download this extension off the Chrome Extensions store.
      </footer>
    </HeroContainer>
  );

  const leavePartySection = (
    <HeroContainer>
      <HeroText align='center' fontWeight='bold'>
        Are you sure you want to leave the party?
      </HeroText>
      <ButtonLink to={isChatActive ? '/chat' : '/setup'}>
        Return to party
      </ButtonLink>
      <ButtonLink variant='danger' onClick={handlePartyExit}>
        Leave party
      </ButtonLink>
    </HeroContainer>
  );

  return (
    <HomeWrapper>
      {isPartyCreated ? leavePartySection : initSection}
    </HomeWrapper>
  );
};

export default Popup;
