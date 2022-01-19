import styled from 'styled-components';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '../../components/Slider';
import ButtonLink from '../../components/ButtonLink';
import {
  restrictPartyControlSelect,
  setPartyControlRestriction,
  setPartyStatus,
  setChatStatus,
  isPartyActiveSelect,
  isChatActiveSelect,
} from '../../redux/partySlice';
import { resetUser } from '../../redux/userSlice';
import { WebSocketContext } from '../../app/websocket';

const Home = () => {
  const restrictPartyControl = useSelector(restrictPartyControlSelect);
  const isPartyActive = useSelector(isPartyActiveSelect);
  const isChatActive = useSelector(isChatActiveSelect);
  const dispatch = useDispatch();
  const { createParty, restrictControl } = useContext(WebSocketContext);

  const handleCreateParty = () => {
    createParty();
    dispatch(setPartyStatus());
  };

  const handlePartyExit = () => {
    dispatch(setChatStatus(false));
    dispatch(setPartyStatus(false));
    dispatch(resetUser());
  };

  const handleRestrictPartyControl = () => {
    dispatch(setPartyControlRestriction(!restrictPartyControl));
    restrictControl(!restrictPartyControl);
  };

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
          onClick={handleRestrictPartyControl}
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
    <HomeWrapper>{isPartyActive ? leavePartySection : initSection}</HomeWrapper>
  );
};

const HomeWrapper = styled.section`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  font-size: 1rem;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

  & footer {
    font-style: italic;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const HeroText = styled.h1`
  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ fontWeight }) => fontWeight || 'regular'};
  font-size: 1.5rem;

  & span {
    display: block;
    font-weight: 700;
  }
`;

export default Home;
