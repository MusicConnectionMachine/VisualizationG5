let _id;


export default class IFrameService {
  static activateFullScreen(widgetName) {
    window.parent.postMessage({
      text: 'full-screen activated',
      widget: widgetName,
      id: _id,
    }, '*');
  }


  static deactivateFullScreen(widgetName) {
    window.parent.postMessage({
      text: 'full-screen deactivated',
      widget: widgetName,
      id: _id,
    }, '*');
  }


  static setId(id) {
    _id = id;
  }
}
