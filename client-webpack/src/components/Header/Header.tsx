import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Logo from 'Components/Logo';
import IconImage from 'Components/IconImage';

interface HeaderProps {
  displayLink: boolean;
  displayUserIcon: boolean;
  userIconUrl: string;
  logoUrl: string;
}

const Header = ({
  displayLink,
  displayUserIcon,
  userIconUrl,
  logoUrl,
}: HeaderProps) => {
  return (
    <StyledHeader>
      <Logo link='/' logoUrl={logoUrl}>
        The
        <br />
        Criterion
        <br />
        Watch
        <br />
        Party
      </Logo>
      <ProfileConfigContainer>
        <StyledLinkIcon
          visibility={displayLink ? 'visible' : 'hidden'}
          icon={faLink}
          size='1x'
          // TODO: Modify this event handler to do something.
          onClick={() => {}}
        />
        <IconImage visible={displayUserIcon} src={userIconUrl} size='md' />
      </ProfileConfigContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

const StyledLinkIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const ProfileConfigContainer = styled.div`
  display: flex;
  width: 35%;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
