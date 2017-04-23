import RemoteService from '../../RemoteService';


export default class MapDataService {
  constructor(entityId, entityType) {
    this.endpointUrl = MapDataService._getEndpointUrl(entityId, entityType);
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
