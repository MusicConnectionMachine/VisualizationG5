import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Application from './components/relations-widget/Application';


injectTapEventPlugin({
  shouldRejectClick: 'ontouchstart' in window ? () => true : null,
});

function startApp() {
  ReactDOM.render(<Application entity="Mozart" />, document.getElementById('react-app'));
}

startApp();
