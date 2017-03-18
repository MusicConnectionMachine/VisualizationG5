/**
 * @typedef {Object} Event
 * @property {string} start - the start date of an event
 * @property {string} title - the title should be short enough to be displayed in the small box inside of the timeline
 * @property {string} [description] - a longer description that will be displayed in a tooltip
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
    description: `The death of Ludwig van Beethoven on 26 March 1827 at the age of 56 followed a prolonged illness. It was witnessed by his sister-in-law and by his close friend Anselm Hüttenbrenner, who provided a vivid description of the event. Beethoven's funeral was held three days later, and the procession was witnessed by a large crowd. He was buried in the cemetery at Währing, although his remains were moved in 1888 to Vienna's Zentralfriedhof.\nHüttenbrenner's account has been used to ascribe motivations of resistance and anger to Beethoven in his final moments. Beethoven's last words, and the exact cause of Beethoven's death have also been the subject of some disagreement.`,
    icon: 'https://dummyimage.com/48x48/ccc/000',
    link: 'https://en.wikipedia.org/wiki/Death_of_Ludwig_van_Beethoven',
    linkType: 'external',
  },
  {
    start: '1790-05-02',
    title: 'First Publication',
    link: '/work/1',
  },
  {
    start: '1812-05-18',
    title: 'A very important project about whatever',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
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
