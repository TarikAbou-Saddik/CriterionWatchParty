import styled from 'styled-components';
import ButtonLink from '../../components/ButtonLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`
  transform: translateX(-15px);
  font-size: 1.3rem;
  opacity: 0;
  &.active {
    opacity: 1;
  }
`;

export const SetupWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4vh;

  & > h1 {
    margin-top: 4vh;
  }
`;

export const SetupFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4vh;
`;

export const StyledButtonLink = styled(ButtonLink)`
  margin: 0 auto;
`;

export const ProfileIconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3vh;
  justify-items: center;
`;
