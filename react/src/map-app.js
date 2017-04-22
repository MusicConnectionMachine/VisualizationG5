import injectTapEventPlugin from 'react-tap-event-plugin';
import Application from './components/map-app/Application';
import StartupService from './StartupService';


injectTapEventPlugin({
  shouldRejectClick: 'ontouchstart' in window ? () => true : null,
});

StartupService.start(Application);
