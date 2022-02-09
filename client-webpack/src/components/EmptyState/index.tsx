import styled from 'styled-components';
import ButtonLink from '../ButtonLink';
import { getActiveTab } from '../../utils/chromeUtils';

interface EmptyStateProps {
  url?: string;
}

const criterionChannelUrl = 'https://www.criterionchannel.com/';
const criterionChannelBrowseUrl = `${criterionChannelUrl}/browse`;

const EmptyState = ({ url }: EmptyStateProps) => {
  const redirect = (url: string, newTab?: boolean) => {
    if (chrome) {
      if (newTab) {
        chrome.tabs.create({ active: true, url });
      } else {
        getActiveTab().then(tab =>
          chrome.tabs.update(tab.id as number, { url }),
        );
      }
      window.close();
    }
  };

  return (
    <WrongSiteWrapper>
      {url?.includes('criterionchannel') ? (
        <>
          <p>Start watching a film to be able create a party.</p>
          <ButtonLink
            onClick={() => redirect(criterionChannelBrowseUrl, false)}
          >
            Browse
          </ButtonLink>
        </>
      ) : (
        <>
          <p>To use the extension, please head to The Criterion Channel.</p>
          <ButtonLink onClick={() => redirect(criterionChannelUrl, true)}>
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
