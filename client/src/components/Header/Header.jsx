import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo';
import IconImage from '../IconImage';
import { copyToClipboard, getPartyId } from '../../utils';

const Header = ({ displayLink, displayerUserIcon, userIconUrl }) => {
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
      <ProfileConfigContainer>
        <StyledLinkIcon
          visibility={displayLink ? 'visible' : 'hidden'}
          icon={faLink}
          size='1x'
          onClick={() =>
            copyToClipboard(
              `${window.location.href}?criterionParty=${getPartyId()}`,
            )
          }
        />
        <IconImage visible={displayerUserIcon} src={userIconUrl} size='md' />
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
