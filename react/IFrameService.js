

export default class IFrameService {
  static activateFullScreen(widgetName) {
    window.parent.postMessage({
      text: 'full-screen activated',
      widget: widgetName,
    }, '*');
  }


  static deactivateFullScreen(widgetName) {
    window.parent.postMessage({
      text: 'full-screen deactivated',
      widget: widgetName,
    }, '*');
  }
}
