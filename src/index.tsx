import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// @ts-ignore
root.render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
);