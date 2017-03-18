import drawGraph from './components/person-graph/drawGraph';
import '../scss/person-graph.scss';

function startApp() {
  drawGraph(document.getElementById('react-app'));
}

startApp();
