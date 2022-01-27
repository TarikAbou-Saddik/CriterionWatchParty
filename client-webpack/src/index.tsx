import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import store from './app/store';
import { Provider } from 'react-redux';
import { theme } from './styles/Theme';
import GlobalStyles from './styles/Global';
import { PartyStateProvider } from './app/context';
import App from './app/App';

render(
  <Provider store={store}>
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <PartyStateProvider>
          <App />
        </PartyStateProvider>
      </ThemeProvider>
    </MemoryRouter>
  </Provider>,
  document.getElementById('popup'),
);
