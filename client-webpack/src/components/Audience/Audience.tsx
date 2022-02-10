import styled from 'styled-components';
import IconImage from 'Components/IconImage';

interface AudienceProps {
  memberIconsUrls: string[];
}

const Audience = ({ memberIconsUrls }: AudienceProps) => (
  <AudienceWrapper>
    <IconListContainer>
      {memberIconsUrls.map((iconUrl, index) => (
        <IconImage
          key={`audience_icon_${index}`}
          src={iconUrl}
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
