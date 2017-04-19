import RemoteService from '../../../RemoteService';


export default class RelationsDataService {
  constructor(entityId, entityType) {
    // TODO Need https://github.com/MusicConnectionMachine/api/issues/101 to be done.
    this.entityId = 123;
    this.entityType = 'artist';
    this.endpointUrl = RelationsDataService._getEndpointUrl(this.entityId, this.entityType);
  }


  loadRelations(opt) {
    const {
      relation,
      object,
      offset,
      limit,
      query,
    } = opt || {};
    const params = new Map();
    if (relation) params.set('relation', relation);
    if (object) params.set('object', object);
    if (offset) params.set('offset', offset);
    if (limit) params.set('limit', limit);
    if (query) params.set('query', query);
    return RemoteService.get(this.endpointUrl, params).then(RelationsDataService._transform);
  }


  static _transform(backendEntity) {
    return {
      id: backendEntity.id,
      entity1: backendEntity.Subject.name,
      entity1Id: backendEntity.Subject.id,
      relation: backendEntity.relation,
      entity2: backendEntity.Object.name,
      entity2Id: backendEntity.Object.id,
      confidence: backendEntity.confidence,
    };
  }


  static _getEndpointUrl(entityId, entityType) {
    return `/${entityType}/${entityId}/relationships`;
  }
}
