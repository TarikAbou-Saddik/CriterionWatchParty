import { useEffect, useState } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import Popup from '../pages/Popup';
import Setup from '../pages/Setup';
import { iconsListUrls } from '../utils/mediaUtils';
import CriterionLogo from '../assets/CriterionLogo.svg';
import useChromeStorage from '../hooks/useChromeStorage';

const userIconUrl = iconsListUrls[0];

const App = () => {
  const [displayExtension, setDisplayExtension] = useState(false);
  const { state, dispatch } = useChromeStorage();

  const isWatchingAFilm = (url: string | undefined) =>
    url?.includes('criterionchannel.com/videos') ||
    url?.includes('videos') ||
    false;

  useEffect(() => {
    const init = async () => {
      setDisplayExtension(isWatchingAFilm(state.activeTabUrl));
    };
    init();
  }, [state.activeTabUrl]);

  const handleSetupCompletion = async (isExit: boolean) => {
    if (isExit) {
      dispatch({ type: 'RESET' });
    } else {
      dispatch({ type: 'SET_PARTY_CREATED', payload: true });
    }
  };

  return (
    <Container>
      {displayExtension ? (
        <>
          <Header
            displayLink={state.isChatActive}
            displayUserIcon={state.isPartyCreated}
            userIconUrl={userIconUrl}
            logoUrl={CriterionLogo}
          />
          {state.isPartyCreated ? (
            <Setup />
          ) : (
            <Popup
              isChatActive={state.isChatActive}
              isPartyCreated={state.isPartyCreated}
              handleSetup={handleSetupCompletion}
              restrictPartyControl={state.restrictPartyControl}
              handleControl={() => dispatch({ type: 'SET_PARTY_CONTROL' })}
            />
          )}
        </>
      ) : (
        <EmptyState url={state.activeTabUrl} />
      )}
    </Container>
  );
};

export default App;
