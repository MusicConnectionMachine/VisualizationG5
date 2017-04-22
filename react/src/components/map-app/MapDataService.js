import RemoteService from '../../RemoteService';


export default class MapDataService {
  constructor(imslpLink) { // eslint-disable-line
    // TODO Need https://github.com/MusicConnectionMachine/api/issues/101 to be done.
    this.entityId = 'ef680fc7-f265-4248-9597-12435182fcd7';
    this.entityType = 'artist';
    this.endpointUrl = MapDataService._getEndpointUrl(this.entityId, this.entityType);
  }


  loadPlaces() {
    const params = new Map();
    return RemoteService.get(this.endpointUrl, params).then(resText => (
      MapDataService._transformData(JSON.parse(resText))));
  }


  static _getEndpointUrl(entityId, entityType) {
    const entityUrl = `${entityType}s`;
    return `/${entityUrl}/${entityId}/places`;
  }


  static _transformData(backendData) {
    backendData.forEach((place) => { place.position = [place.lat, place.lng]; });
    return backendData;
  }
}
