import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppRoot from './client/containers/AppRoot';

function render(Container) {
  ReactDOM.hydrate(
    <AppContainer>
      <Container />
    </AppContainer>,
    document.getElementById('react-root')
  );
}
render(AppRoot);

if (module.hot) {
  module.hot.accept('./client/containers/AppRoot.js', () => {
    const NewAppRoot = require('./client/containers/AppRoot.js').default;
    render(NewAppRoot);
  });
}
