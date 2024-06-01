import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { I18nWrapper } from './components';
import { MainEvents } from './components/Common/components/MainLayout/components/MainLayout/components';
import Routes from './Routes';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastify_override.scss';
import 'react-datasheet/lib/react-datasheet.css';

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nWrapper.I18nWrapper>
        <React.Fragment>
          <ToastContainer />
          <MainEvents>
            <Routes />
          </MainEvents>
        </React.Fragment>
      </I18nWrapper.I18nWrapper>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
