import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { darkTheme } from '../styles/Theme';
import { Routes, Route } from 'react-router-dom';
import Container from '../components/Container';
import Header from '../components/Header';
import Home from '../pages/Home';
import Setup from '../pages/Setup';
import GlobalStyles from '../styles/Global';
import Audience from '../components/Audience';
import Chat from '../pages/Chat';
import { userIconSelect } from '../redux/userSlice';
import { isChatActiveSelect, isPartyActiveSelect } from '../redux/partySlice';

const App = () => {
  const isChatActive = useSelector(isChatActiveSelect);
  const isPartyActive = useSelector(isPartyActiveSelect);
  const showAudience = useSelector(state => state.party.showAudience);
  const { url: userIconUrl } = useSelector(userIconSelect);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Container>
        <Header
          displayLink={isChatActive}
          displayerUserIcon={isPartyActive}
          userIconUrl={userIconUrl}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/setup' element={<Setup />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
        {showAudience && <Audience />}
      </Container>
    </ThemeProvider>
  );
};

export default App;
