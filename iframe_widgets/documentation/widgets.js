window.MCMWidgets = {};


window.MCMWidgets.init = function (opt) {
  const widget = opt.widget;
  const rootElement = opt.rootElement;
  const url = window.location.href;

  if (widget !== 'timeline' && widget !== 'relations' && widget !== 'map') {
    return;
  }

  const urls = {
    timeline: 'http://mcmwidgets.azurewebsites.net/widgets/timeline-app.html?imslp=' + url,
    relations: 'http://mcmwidgets.azurewebsites.net/widgets/relations-widget.html?imslp=' + url,
    map: 'http://mcmwidgets.azurewebsites.net/widgets/map-app.html?imslp=' + url,
  };
  rootElement.src = urls[widget];

  function onMessageFromWidget(event) {
    if (widget === event.data.widget) {
      if (event.data.text === 'full-screen activated') {
        rootElement.style.height = '99vh';
        rootElement.style.width = '99vw';
        rootElement.style.position = 'fixed';
        rootElement.style.left = '0';
        rootElement.style.top = '0';
        rootElement.style.zIndex = '9999999';
      } else if (event.data.text === 'full-screen deactivated') {
        rootElement.style.height = '400px';
        rootElement.style.width = '100%';
        rootElement.style.position = 'inherit';
        rootElement.style.left = 'auto';
        rootElement.style.top = 'auto';
        rootElement.style.zIndex = 'auto';
      }
    }
  }
  window.addEventListener('message', onMessageFromWidget, false);
};
