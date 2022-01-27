import styled from 'styled-components';
import { redirectToCriterionChannel } from '../../utils/chromeUtils';
import ButtonLink from '../ButtonLink';

const EmptyState = () => {
  return (
    <WrongSiteWrapper>
      <p>To use the extension, please head to The Criterion Channel.</p>
      <ButtonLink onClick={redirectToCriterionChannel}>Click Here</ButtonLink>
    </WrongSiteWrapper>
  );
};

const WrongSiteWrapper = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;

  & p {
    font-size: 1rem;
    text-align: center;
  }
`;

export default EmptyState;
