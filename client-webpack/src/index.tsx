import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import { GlobalStyles } from './styles/Global';
import App from './app/App';
import React from 'react';

render(
  <React.StrictMode>
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('popup'),
);
