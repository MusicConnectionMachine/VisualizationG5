import RemoteService from '../../RemoteService';


export default class DataService {
  constructor(entityId, entityType) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.entityEndpointUrl = DataService._getEntityEndpointUrl(this.entityId, this.entityType);
    this.eventsEndpointUrl = DataService._getEventsEndpointUrl(this.entityId, this.entityType);
  }


  fetchData() {
    let entity;
    let events;
    return Promise.all([
      RemoteService.get(this.entityEndpointUrl, new Map()).then((_entity) => { entity = JSON.parse(_entity); }),
      RemoteService.get(this.eventsEndpointUrl, new Map()).then((_events) => { events = JSON.parse(_events); }),
    ]).then(() => {
      entity.events = DataService._transformEvents(events);
      return entity;
    });
  }


  static _getEntityEndpointUrl(entityId, entityType) {
    const entityUrl = `${entityType}s`;
    return `/${entityUrl}/${entityId}`;
  }


  static _getEventsEndpointUrl(entityId, entityType) {
    if (entityType !== 'artist') {
      throw new Error('API is not implemented.');
    }
    const entityUrl = `${entityType}s`;
    return `/${entityUrl}/${entityId}/events`;
  }


  static _transformEvents(apiEvents) {
    return apiEvents.map(({ start, end, description, id }) => {
      let tooltipContent = start;
      if (end) {
        tooltipContent += ` - ${end}`;
      }
      return {
        id,
        start,
        tooltipContent,
        title: description,
      };
    });
  }
}
