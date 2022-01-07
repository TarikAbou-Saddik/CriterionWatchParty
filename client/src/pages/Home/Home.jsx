import styled from 'styled-components';
import Slider from '../../components/Slider';
import ButtonLink from '../../components/ButtonLink';

const Home = () => {
  return (
    <HeroContainer>
      <HeroText>
        Watch the best of what <span>The Criterion Collection</span> has to
        offer along with your friends and family.
      </HeroText>
      <HeroControlContainer>
        Restrict party control
        <Slider onClick={() => {}} />
      </HeroControlContainer>
      <ButtonLink to='/setup'>Create a party</ButtonLink>
      <footer>
        For this extension to work, you are required to be a subscriber of The
        Criterion Channel. You must also inform your guests that they must
        download this extension off the Chrome Extensions store.
      </footer>
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
  font-weight: 400;
  font-size: 2.5rem;

  & span {
    display: block;
    font-weight: 700;
  }
`;

export default Home;
