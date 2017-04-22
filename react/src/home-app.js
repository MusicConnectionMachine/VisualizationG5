import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Application from './components/home-app/Application';


injectTapEventPlugin({
  shouldRejectClick: 'ontouchstart' in window ? () => true : null,
});

function startApp() {
  const root = document.getElementById('react-app');
  ReactDOM.render(<Application host="http://localhost:3000/api/v1" />, root);
}

startApp();
