import { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/Theme';
import { Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import Header from './components/Header';
import Home from './pages/Home';
import Setup from './pages/Setup';
import GlobalStyles from './styles/Global';
import Audience from './components/Audience';
import Chat from './pages/Chat';

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/setup' element={<Setup />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
        <Audience />
      </Container>
    </ThemeProvider>
  );
};

export default App;
