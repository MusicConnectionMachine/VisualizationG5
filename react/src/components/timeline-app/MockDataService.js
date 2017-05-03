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
    id: 'uuid0',
    start: '1685-01-01',
    title: 'Bach was born in Eisenach in 1685.',
  },
  {
    id: 'uuid1',
    start: '1700-01-01',
    title: 'Because of his excellent singing voice, Bach attained a position at the Michaelis monastery at L?neberg in 1700.',
  },
  {
    id: 'uuid2',
    start: '1703-01-01',
    title: 'After taking a short-lived post in Weimar in 1703 as a violinist, Bach became organist at the Neue Kirche in Arnstadt (1703-1707).',
  },
  {
    id: 'uuid3',
    start: '1707-06.01',
    title: 'Blasius in M?hlhausen as organist, beginning in June 1707, and married his cousin, Maria Barbara Bach, that fall.',
  },
  {
    id: 'uuid4',
    start: '1708-01-010',
    title: 'He next took a post for the Duke of Sachsen-Weimar in 1708, serving as court organist and playing in the orchestra, eventually becoming its leader in 1714.',
  },
  {
    id: 'uuid5',
    start: '1717-01-01',
    title: 'Owing to politics between the Duke and his officials, Bach left Weimar and secured a post in December 1717 as Kapellmeister at C?then.',
  },
  {
    id: 'uuid6',
    start: '1720-01-01',
    title: "In 1720, Bach's wife suddenly died, leaving him with four children (three others had died in infancy).",
  },
  {
    id: 'uuid7',
    start: '1721-12-01',
    title: 'A short while later, he met his second wife, soprano Anna Magdalena Wilcke, whom he married in December 1721.',
  },
  {
    id: 'uuid8',
    start: '1723-05-01',
    title: 'Bach became Kantor of the Thomas School in Leipzig in May 1723 and held the post until his death.',
  },
  {
    id: 'uuid9',
    start: '1729-01-01',
    title: "Thus, he took on other projects, chief among which was the directorship of the city's Collegium Musicum, an ensemble of professional and amateur musicians who gave weekly concerts, in 1729.",
  },
  {
    id: 'uuid10',
    start: '1736-01-01',
    title: 'He also became music director at the Dresden Court in 1736, in the service of Frederick Augustus II; though his duties were vague and apparently few, they allowed him freedom to compose what he wanted.',
  },
  {
    id: 'uuid11',
    start: '1740-01-01',
    title: 'Bach began making trips to Berlin in the 1740s, not least because his son Carl Philipp Emanuel served as a court musician there.',
  },
  {
    id: 'uuid12',
    start: '1747-05-01',
    title: 'In May 1747, the composer was warmly received by King Frederick II of Prussia, for whom he wrote the gloriously abstruse Musical Offering (BWV 1079).',
  },
  {
    id: 'uuid13',
    start: '1749-01-01',
    title: "Among Bach's last works was his 1749 Mass in B minor.",
  },
  {
    id: 'uuid14',
    start: '1750-07-28',
    title: 'Besieged by diabetes, he died on July 28, 1750.',
  },
];


export default class MockDataService {
  fetchData() { // eslint-disable-line
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          events: EVENTS,
          name: 'Johann Sebastian Bach',
          brithday: '1685-03-21',
          birthplace: 'Eisenach',
          deathdate: '1750-07-28',
          deathplace: 'Leipzig',
        });
      }, 150);
    });
  }
}
