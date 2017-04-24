export default class DataService {
  constructor(entityId, entityType) {
    this.entityId = entityId;
    this.entityType = entityType;
  }


  fetchData(entityId, entityType) { // eslint-disable-line
    throw new Error('API is not implemented.');
  }
}
