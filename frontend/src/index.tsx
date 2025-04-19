import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './entities/store/store';
import { UserSliceManager } from './entities/store/featuries/userSlice';
import { Provider } from 'react-redux';
import { ProjectSliceManager } from './entities/store/featuries/projectSlice';

async function start() {
  store.dispatch(UserSliceManager.fetching.getData()) // при внесении изменений надо useAuthSubmit рефакторить
  store.dispatch(ProjectSliceManager.fetching.getData())

  const root = ReactDOM.createRoot(document.getElementById('root')!)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

start()