import React from 'react';
import ReactDOM from 'react-dom';


let environment = process.env.NODE_ENV;


export default class StartupService {
  static start(Application, additionalProps) {
    if (StartupService.isMockupMode()) {
      environment = 'dev-mockups';
    }

    StartupService.getEntityInformation().then(({ entityType, entityId }) => {
      const root = document.getElementById('react-app');
      ReactDOM.render(<Application entityType={entityType} entityId={entityId} {...additionalProps} />, root);
    });
  }


  static getEntityInformation() {
    const queryParams = window.location.search.substring(1).split('&').map(s => s.split('='));
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
    let url = window.location.href;
    let indexToCutOut = url.indexOf("wiki") + 5;
    //If Composer
    if (url.indexOf("Category") >= 0) {
      indexToCutOut = indexToCutOut + 9;
      url = url.slice(indexToCutOut);
      let lastname = url.slice(0,url.indexOf(","));
      let firstname = url.slice(url.indexOf(",")+2);
      let title = firstname + '_' +lastname;
      title = title.replace(new RegExp('_', 'g'), ' ');

      const url = `http://mcmapi.azurewebsites.net/search/entities?q=${title}&limit=1`;
      return fetch(url, {
        headers: {
          'API-KEY': 123,
        },
      })
        .then(res => res.json())
        .then(res => {
          return res[0].artists[0];
        });
    }
    //If Composition
    else {
      url = url.slice(indexToCutOut);
      let composition = url.slice(0,url.indexOf('(')-1);
      composition = composition.replace(new RegExp('_', 'g'), ' ');
      const title = composition;

      const url = `http://mcmapi.azurewebsites.net/search/entities?q=${title}&limit=1`;
      return fetch(url, {
        headers: {
          'API-KEY': 123,
        },
      })
        .then(res => res.json())
        .then(res => {
          return res[0].works[0];
        });
    }
    // See: https://github.com/MusicConnectionMachine/api/issues/101
    return Promise.resolve({
      entityId: '550e8400-e29b-11d4-a716-446655440000',
      entityType: 'artist',
    });
  }


  static isMockupMode() {
    return window.location.search.substring(1)
      .split('&')
      .map(s => s.split('='))
      .some(([name]) => name === 'useMockups');
  }


  static getEnvironment() {
    return environment;
  }
}
