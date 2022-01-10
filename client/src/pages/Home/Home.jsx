import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '../../components/Slider';
import ButtonLink from '../../components/ButtonLink';
import {
  restrictPartyControlSelect,
  togglePartyControlRestriction,
  togglePartyStatus,
  toggleChatStatus,
  isChatActiveSelect,
} from '../../redux/partySlice';

const Home = () => {
  const restrictPartyControl = useSelector(restrictPartyControlSelect);
  const isChatActive = useSelector(isChatActiveSelect);
  const dispatch = useDispatch();

  const handlePartyExit = () => {
    dispatch(toggleChatStatus());
    dispatch(togglePartyStatus());
  };

  const initSection = (
    <>
      <HeroText fontWeight='regular'>
        Watch the best of what <span>The Criterion Collection</span> has to
        offer along with your friends and family.
      </HeroText>
      <HeroControlContainer>
        Restrict party control
        <Slider
          active={restrictPartyControl}
          onClick={() => dispatch(togglePartyControlRestriction())}
        />
      </HeroControlContainer>
      <ButtonLink to='/setup' onClick={() => dispatch(togglePartyStatus())}>
        Create a party
      </ButtonLink>
      <footer>
        For this extension to work, you are required to be a subscriber of The
        Criterion Channel. You must also inform your guests that they must
        download this extension off the Chrome Extensions store.
      </footer>
    </>
  );

  const leavePartySection = (
    <>
      <HeroText align='center' fontWeight='bold'>
        Are you sure you want to leave the party?
      </HeroText>
      <ButtonLink to='/chat'>Return to party</ButtonLink>
      <ButtonLink variant='danger' onClick={handlePartyExit}>
        Leave party
      </ButtonLink>
    </>
  );

  return (
    <HeroContainer>
      {isChatActive ? leavePartySection : initSection}
    </HeroContainer>
  );
};

const HeroControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
`;

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4vh;
  align-items: center;

  & footer {
    font-style: italic;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const HeroText = styled.h1`
  margin-top: 10vh;
  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ fontWeight }) => fontWeight || 'regular'};
  font-size: 2.5rem;

  & span {
    display: block;
    font-weight: 700;
  }
`;

export default Home;
