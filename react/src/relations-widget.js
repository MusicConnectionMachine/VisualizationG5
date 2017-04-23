import injectTapEventPlugin from 'react-tap-event-plugin';
import Application from './components/relations-widget/Application';
import StartupService from './StartupService';


injectTapEventPlugin({
  shouldRejectClick: 'ontouchstart' in window ? () => true : null,
});

StartupService.start(Application, { entity: 'Mozart' });
