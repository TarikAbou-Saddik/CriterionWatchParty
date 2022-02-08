import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import Popup from '../pages/Popup';
import Setup from '../pages/Setup';
import { iconsListUrls } from '../utils/mediaUtils';
import CriterionLogo from '../assets/CriterionLogo.svg';
import {
  getActiveTabUrl,
  getChromeState,
  setChromeStorageValue,
} from '../utils/chromeUtils';

const userIconUrl = iconsListUrls[0];

const App = () => {
  const [hasInit, setHasInit] = useState(false);
  const [displayExtension, setDisplayExtension] = useState(false);
  const [activeTabUrl, setActiveTabUrl] = useState<string | undefined>();
  // State that should be persisted to chrome.storage
  const [isChatActive, setIsChatActive] = useState(false);
  const [isPartyCreated, setIsPartyCreated] = useState(false);
  const [restrictPartyControl, setRestrictPartyControl] = useState(false);

  const isWatchingAFilm = (url: string | undefined) =>
    url?.includes('criterionchannel.com/videos') ||
    url?.includes('videos') ||
    false;

  useEffect(() => {
    const init = async () => {
      const activeTabUrl = await getActiveTabUrl();
      const { success, data: restrictPartyControlExists } =
        await getChromeState('restrictPartyControl');
      if (success) {
        setRestrictPartyControl(restrictPartyControlExists);
        setHasInit(true);
      } else {
        console.error(restrictPartyControlExists);
      }
      setActiveTabUrl(activeTabUrl);
      setDisplayExtension(isWatchingAFilm(activeTabUrl));
    };
    init();
  }, []);

  useEffect(() => {
    const update = async () => {
      const { data, success } = await setChromeStorageValue({
        key: 'restrictPartyControl',
        value: restrictPartyControl,
      });
      if (!success) {
        console.error(`Failed to persist restrictPartyControl: ${data}`);
      }
    };
    if (hasInit) {
      update();
    }
  }, [restrictPartyControl]);

  const resetState = async () => {
    setIsPartyCreated(false);
    setIsChatActive(false);
    setRestrictPartyControl(false);
  };

  const handleSetupCompletion = async (isExit: boolean) => {
    if (isExit) {
      await resetState();
    } else {
      setIsPartyCreated(true);
    }
  };

  const mainContent = isPartyCreated ? (
    <Setup />
  ) : (
    <Popup
      isChatActive={isChatActive}
      isPartyCreated={isPartyCreated}
      handleSetup={handleSetupCompletion}
      restrictPartyControl={restrictPartyControl}
      handleControl={() => setRestrictPartyControl(prev => !prev)}
    />
  );

  return (
    <Container>
      {displayExtension ? (
        <>
          <Header
            displayLink={isChatActive}
            displayUserIcon={isPartyCreated}
            userIconUrl={userIconUrl}
            logoUrl={CriterionLogo}
          />
          {mainContent}
        </>
      ) : (
        <EmptyState url={activeTabUrl} />
      )}
    </Container>
  );
};

export default App;
