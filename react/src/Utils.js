export default class Utils {
  static download(filename, content, mimeType = 'text/plain') {
    const url = 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(content);
    const el = document.createElement('a');
    el.setAttribute('href', url);
    el.setAttribute('download', filename);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }
}
