import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo';
import IconImage from '../IconImage';
import { copyToClipboard } from '../../utils';

interface HeaderProps {
  displayLink: boolean;
  displayUserIcon: boolean;
  userIconUrl: string;
}

const Header = ({ displayLink, displayUserIcon, userIconUrl }: HeaderProps) => {
  console.log(`Rendering Header component!`);
  return (
    <StyledHeader>
      <Logo link='/'>
        The
        <br />
        Criterion
        <br />
        Watch
        <br />
        Party
      </Logo>
      {/* <ProfileConfigContainer>
        <StyledLinkIcon
          visibility={displayLink ? 'visible' : 'hidden'}
          icon={faLink}
          size='1x'
          onClick={() => {}}
        />
        <IconImage visible={displayUserIcon} src={userIconUrl} size='md' />
      </ProfileConfigContainer> */}
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
