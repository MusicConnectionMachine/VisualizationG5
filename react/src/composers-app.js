import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Composers from './components/composers-app/Composers';


injectTapEventPlugin({
  shouldRejectClick: 'ontouchstart' in window ? () => true : null,
});

function startApp() {
  ReactDOM.render(<Composers />, document.getElementById('react-app'));
}

startApp();
