import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import WebSocketProvider from './app/websocket';
import store from './app/store';
import App from './app/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </WebSocketProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
