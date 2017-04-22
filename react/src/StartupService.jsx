import React from 'react';
import ReactDOM from 'react-dom';


export default class StartupService {
  static start(Application) {
    console.log(window.location.search);
    StartupService.getEntityInformation().then(({ entityType, entityId }) => {
      console.log(entityType, entityId);

      const root = document.getElementById('react-app');
      ReactDOM.render(<Application entityType={entityType} entityId={entityId} />, root);
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
    return Promise.resolve({
      entityId: '550e8400-e29b-11d4-a716-446655440000',
      entityType: 'artist',
    });
  }
}
