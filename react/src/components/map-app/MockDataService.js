import MapDataService from './MapDataService';


export default class MockDataService {
  loadPlaces() { // eslint-disable-line
    return Promise.resolve(MapDataService._transformData([
      {
        id: '550e8400-e29b-11d4-a716-446655440001',
        lat: 47.80949,
        lng: 13.05501,
        city: 'Salzburg',
        description: 'Mozart was born in Salzburg on 27 Januar 1756.',
      },
      {
        id: '550e8400-e29b-11d4-a716-446655440002',
        lat: 48.2081743,
        lng: 16.3738189,
        city: 'Vienna',
        description: 'Mozart died in Vienna on 5 December 1791.',
      },
    ]));
  }
}
