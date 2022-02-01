import styled from 'styled-components';

interface HeroTextProps {
  align?:
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent';
  fontWeight?: string | number;
}

const HomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  height: ${({ theme }) => theme.height};
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
  margin-top: 8vh;

  & footer {
    font-style: italic;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const HeroText = styled.h1<HeroTextProps>`
  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ fontWeight }) => fontWeight || 'regular'};
  font-size: 1.5rem;

  & span {
    display: block;
    font-weight: 700;
  }
`;

export { HomeWrapper, HeroControlContainer, HeroContainer, HeroText };
