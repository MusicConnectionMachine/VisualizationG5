const HOST_URL = 'http://mcmapi.azurewebsites.net';
const API_KEY = 'not secure';


export default class RemoteService {
  /**
   * @param {string} endpointPath - e.g., '/artists/15
   * @param {Map.<string, *>} paramsMap - e.g., new Map([['offset', 20]])
   * @return {Promise}
   */
  static get(endpointPath, paramsMap) {
    return new Promise((resolve, reject) => {
      let url = `${HOST_URL + endpointPath}?`;
      const params = [];
      paramsMap.forEach((value, name) => {
        params.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
      });
      url += params.join('&');

      const http = new window.XMLHttpRequest();
      http.timeout = 5000;
      http.open('GET', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.setRequestHeader('API-KEY', API_KEY);
      http.onreadystatechange = function onreadystatechange() {
        if (http.status === 200) {
          resolve(http.response);
        } else {
          reject(http.statusText);
        }
      };
      http.onerror = reject;
      http.send();
    });
  }
}
