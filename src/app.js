import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import AppRoot from './client/AppRoot';
import configureStore from './shared/store';
import './shared/styles/app.scss';

const store = configureStore(window.INITIAL_STATE);

function render(Component) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <HelmetProvider>
        <AppContainer>
          <Component />
        </AppContainer>
      </HelmetProvider>
    </Provider>,
    document.getElementById('root')
  );
}
render(AppRoot);

if (module.hot) {
  module.hot.accept('./client/AppRoot.js', () => {
    const NewAppRoot = require('./client/AppRoot.js').default;
    render(NewAppRoot);
  });
}
