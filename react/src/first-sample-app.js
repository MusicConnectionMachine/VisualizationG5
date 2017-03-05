import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Application from './components/first-sample-app/Application';


injectTapEventPlugin({
  shouldRejectClick: 'ontouchstart' in window ? () => true : null,
});

function startApp() {
  ReactDOM.render(<Application />, document.getElementById('react-app'));
}

startApp();
