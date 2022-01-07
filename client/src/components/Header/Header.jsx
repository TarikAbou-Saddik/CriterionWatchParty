import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo';
import { copyToClipboard } from '../../utils';

const Header = ({ displayLink }) => {
  // TODO: TEMP UNTIL I IMPLEMENT GLOBAL STATE
  const partyUrl = `${window.location.href}?criterionParty=a50a5d25-e7a8-4238-baa1-8339493dd28d`;

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
          visible={displayLink}
          icon={faLink}
          size='1x'
          onClick={() => copyToClipboard(partyUrl)}
        />
        <StyledFontAwesomeIcon icon={faUserCircle} size='3x' />
      </ProfileConfigContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

const StyledLinkIcon = styled(FontAwesomeIcon)`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)``;

const ProfileConfigContainer = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
