import styled from 'styled-components';
import { redirectToCriterionChannel } from '../../utils/chromeUtils';
import ButtonLink from '../ButtonLink';

interface EmptyStateProps {
  url?: string;
}

const EmptyState = ({ url }: EmptyStateProps) => {
  return (
    <WrongSiteWrapper>
      {url?.includes('criterionchannel') ? (
        <p>Start watching a film to be able create a party.</p>
      ) : (
        <>
          <p>To use the extension, please head to The Criterion Channel.</p>
          <ButtonLink onClick={redirectToCriterionChannel}>
            Click Here
          </ButtonLink>
        </>
      )}
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
