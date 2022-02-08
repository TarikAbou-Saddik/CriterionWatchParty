import styled from 'styled-components';

interface LogoProps {
  children?: React.ReactNode;
  link: string;
  logoUrl: string;
}

const Logo = ({ children, link, logoUrl }: LogoProps) => {
  return (
    <LogoWrapper>
      <LogoImage src={logoUrl} alt='Criterion logo' />
      <LogoHeader>{children}</LogoHeader>
    </LogoWrapper>
  );
};

const LogoImageSize = '60px';

const LogoWrapper = styled.div`
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
  color: ${({ theme }) => theme.textPrimary};
`;

export default Logo;
