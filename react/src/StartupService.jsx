import React from 'react';
import ReactDOM from 'react-dom';
import IFrameService from './IFrameService';
import RemoteService from './RemoteService';


let environment = process.env.NODE_ENV;


export default class StartupService {
  static start(Application, additionalProps) {
    const queryParams = StartupService.getQueryParams();
    IFrameService.setId(StartupService.getId(queryParams));
    if (StartupService.isMockupMode(queryParams)) {
      environment = 'dev-mockups';
      StartupService.renderApplication(Application, 'artists', '-mockups-', additionalProps);
    } else {
      StartupService.getEntityInformation(queryParams).then(({ entityType, entityId }) => {
        StartupService.renderApplication(Application, entityType, entityId, additionalProps);
      });
    }
  }


  static renderApplication(Application, entityType, entityId, additionalProps) {
    const root = document.getElementById('react-app');
    ReactDOM.render(<Application entityType={entityType} entityId={entityId} {...additionalProps} />, root);
  }


  static getQueryParams() {
    return window.location.search.substring(1).split('&').map(s => s.split('='));
  }


  static getId(queryParams) {
    for (let i = 0; i < queryParams.length; i++) {
      const [name, value] = queryParams[i];
      if (name === 'id') {
        return value;
      }
    }
    return undefined;
  }


  static getEntityInformation(queryParams) {
    let entityType;
    let entityId;
    for (let i = 0; i < queryParams.length; i++) {
      const [name, value] = queryParams[i];
      if (name === 'imslp') {
        return StartupService.mapImslpLink(value);
      } else if (name === 'entityType') {
        entityType = value;
      } else if (name === 'entityId') {
        entityId = value;
      }
    }
    if (entityId && entityType) {
      return Promise.resolve({ entityId, entityType });
    }
    throw new Error('Neither an IMSLP-Link nor entityId and entityType are passed.');
  }


  static mapImslpLink(imslpLink) { // eslint-disable-line
    // TODO Call the API to get the real information.
    let windowUrl = decodeURIComponent(window.location.href);
    let indexToCutOut = windowUrl.indexOf('wiki') + 5;
    // If Composer
    if (windowUrl.indexOf('Category') >= 0) {
      indexToCutOut += 9;
      windowUrl = windowUrl.slice(indexToCutOut);
      const lastname = windowUrl.slice(0, windowUrl.indexOf(','));
      const firstname = windowUrl.slice(windowUrl.indexOf(',') + 2);
      let title = `${firstname}_${lastname}`;
      title = title.replace(new RegExp('_', 'g'), ' ');

      return RemoteService.get('/search/artists', new Map([['q', title], ['limit', 1]]))
        .then(JSON.parse)
        .then(res => res.items[0]);
    }
    // If Composition

    windowUrl = windowUrl.slice(indexToCutOut);
    let composition = windowUrl.slice(0, windowUrl.indexOf('(') - 1);
    composition = composition.replace(new RegExp('_', 'g'), ' ');

    return RemoteService.get('/search/works', new Map([['q', composition], ['limit', 1]]))
      .then(JSON.parse)
      .then(res => res.items[0]);
  }


  static isMockupMode(queryParams) {
    return queryParams.some(([name]) => name === 'useMockups') || environment === 'dev-mockups';
  }


  static getEnvironment() {
    return environment;
  }
}
