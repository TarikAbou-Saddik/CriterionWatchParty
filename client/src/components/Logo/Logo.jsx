import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CriterionLogo from './assets/CriterionLogo.svg';

const Logo = ({ children, link }) => {
  return (
    <LogoWrapper to={link}>
      <LogoImage src={CriterionLogo} alt='Criterion logo' />
      <LogoHeader>{children}</LogoHeader>
    </LogoWrapper>
  );
};

const LogoImageSize = '60px';

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  text-decoration: none;
  color: ${({ theme }) => theme.textSecondary};
`;

const LogoImage = styled.img`
  width: ${LogoImageSize};
  height: ${LogoImageSize};
`;

const LogoHeader = styled.h1`
  font-weight: 300;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

export default Logo;
