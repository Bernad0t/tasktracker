import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './entities/store/store';
import { Provider } from 'react-redux';
import ReactModal from 'react-modal';

async function start() {

  const root = ReactDOM.createRoot(document.getElementById('root')!)
  ReactModal.setAppElement('#root');

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

start()