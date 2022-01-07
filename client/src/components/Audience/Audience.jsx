import styled from 'styled-components';
import IconImage from '../IconImage';
import { iconsList } from '../../utils';

const Audience = () => {
  return (
    <AudienceWrapper>
      <IconListContainer>
        {iconsList.map((icon, index) => (
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
};

const AudienceWrapper = styled.div`
  margin: 5vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vh;
  width: fit-content;

  & span {
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const IconListContainer = styled.div``;

export default Audience;
