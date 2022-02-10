import { useEffect, useState } from 'react';
import Container from 'Components/Container';
import Header from 'Components/Header';
import EmptyState from 'Components/EmptyState';
import Popup from 'Pages/Popup';
import Setup from 'Pages/Setup';
import CriterionLogo from 'Assets/CriterionLogo.svg';
import useChromeStorage from 'Hooks/useChromeStorage';

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
            userIconUrl={state.currentUser.icon?.url as string}
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
