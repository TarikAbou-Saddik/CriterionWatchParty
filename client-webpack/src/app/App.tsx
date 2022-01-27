import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import Popup from '../pages/Popup';
import Setup from '../pages/Setup';
import Chat from '../pages/Chat';

// TODO: Remove this call. Debug only.
import { iconsListUrls } from '../utils';
import { isActiveTabCriterionChannel } from '../utils/chromeUtils';
import { getChromeState } from '../redux/partySlice/thunks';

const userIconUrl = iconsListUrls[0];
const isChatActive = false;
const isPartyCreated = false;

const App = () => {
  const dispatch = useDispatch();
  const [isCriterionChannelUrl, setIsCriterionChannelUrl] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsCriterionChannelUrl(await isActiveTabCriterionChannel());
      dispatch(getChromeState('isPartyRestricted'));
    };
    init();
  }, []);

  return (
    <Container>
      {isCriterionChannelUrl ? (
        <>
          <Header
            displayLink={isChatActive}
            displayUserIcon={isPartyCreated}
            userIconUrl={userIconUrl}
          />
          <Routes>
            <Route path='/' element={<Popup />} />
            <Route path='/setup' element={<Setup />} />
            <Route path='/chat' element={<Chat />} />
          </Routes>
        </>
      ) : (
        <EmptyState />
      )}
    </Container>
  );
};

export default App;
