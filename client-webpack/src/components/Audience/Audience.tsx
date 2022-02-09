import styled from 'styled-components';
import IconImage from '../IconImage';
import { iconsListStaticUrls as iconsListUrls } from '../../utils/mediaUtils';

const Audience = () => (
  <AudienceWrapper>
    <IconListContainer>
      {iconsListUrls.slice(0, 3).map((icon, index) => (
        <IconImage
          key={`audience_icon_${index}`}
          src={icon}
          size='sm'
          disabled
        />
      ))}
    </IconListContainer>
    <span>Audience</span>
  </AudienceWrapper>
);

const AudienceWrapper = styled.footer`
  margin: 5vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vh;
  width: fit-content;

  & span {
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const IconListContainer = styled.div``;

export default Audience;
