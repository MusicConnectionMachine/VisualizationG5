/**
 * @typedef {Object}
 * @property {string} start - the start date of an event
 * @property {string} title - the title should be short enough to be displayed in the small box inside of the timeline
 * @property {string} [icon] - the URL to an icon
 * @property {string} [link] - the URL to a page that provides more information
 * @property {string} [linkType='internal'] - if the type is external, a new tab will be opened
 */


/**
 * @type {Array.<Event>}
 */
const EVENTS = [
  {
    start: '1770-12-17',
    title: 'Birth in Bonn',
  },
  {
    start: '1827-03-26',
    title: 'Death in Wien at the Age of 56',
    icon: 'https://dummyimage.com/48x48/ccc/000',
  },
  {
    start: '1790-05-02',
    title: 'First Publication',
    link: '/work/1',
  },
  {
    start: '1812-05-18',
    title: 'A very important project about whatever',
    icon: 'https://dummyimage.com/48x48/ccc/000',
  },
  {
    start: '2016-02-07',
    title: 'Someone performed something great of L. van Beethoven',
    icon: 'https://dummyimage.com/48x48/ccc/000',
    link: 'http://www.spiegel.de/kultur/musik/nikolaus-harnoncourt-dirigiert-beethoven-jung-und-wiewild-wie-nie-a-1075607.html',
    linkType: 'external',
  },
];


export default class MockDataService {
  /**
   * @param {number} entityId
   * @return {Promise}
   */
  /* eslint-disable no-unused-vars */
  static fetchData(entityId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          events: EVENTS,
          name: 'Ludwig van Beethoven',
          brithday: '1876-10-25',
          birthplace: 'Boechout',
          deathdate: '1889-01-02',
          deathplace: 'Königs Wusterhausen',
        });
      }, 150);
    });
  }
}
