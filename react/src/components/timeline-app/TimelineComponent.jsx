import * as ReactDOM from 'react-dom';
import React from 'react';
import vis from 'vis';
import '../../../node_modules/vis/dist/vis.min.css';
import '../../../scss/timeline-app.scss';


export default class TimelineComponent extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    if (this.props.data) {
      this.drawTimeline(this.props.data.events);
    }
  }


  componentWillReceiveProps(nextProps) {
    this.drawTimeline(nextProps.data.events);
  }


  /**
   * @param {Array} events
   */
  drawTimeline(events) {
    /* eslint-disable no-shadow */
    let { max, min } = events.reduce(({ max, min }, event) => {
      event.start = new Date(event.start);
      let localMax = event.start;
      if (event.end) {
        event.end = new Date(event.end);
        localMax = event.end;
      }
      return {
        max: localMax > max ? localMax : max,
        min: event.start < min ? event.start : min,
      };
    }, { max: -Infinity, min: Infinity });
    const margin = max.getYear() - min.getYear();
    min = new Date(min);
    max = new Date(max);
    min.setMonth(min.getMonth() - margin * 3 - 1);
    max.setMonth(max.getMonth() + margin * 3 + 1);

    const container = this.refs.visTimeline;
    const items = new vis.DataSet(events);
    const options = {
      align: 'left',
      format: {
        minorLabels: {
          millisecond: '',
          second: '',
          minute: '',
          hour: '',
          weekday: 'ddd D',
          day: 'D',
          month: 'MMM',
          year: 'YYYY',
        },
        majorLabels: {
          millisecond: 'ddd D MMMM YYYY',
          second: 'ddd D MMMM YYYY',
          minute: 'ddd D MMMM YYYY',
          hour: 'ddd D MMMM YYYY',
          weekday: 'MMMM YYYY',
          day: 'MMMM YYYY',
          month: 'YYYY',
          year: '',
        },
      },
      maxHeight: '25em',
      minHeight: '10em',
      orientation: 'top',
      selectable: false,
      showCurrentTime: false,
      template: (item, element) => {
        const className = 'timeline__itembox ' +
          (item.icon ? 'timeline__itembox--icon ' : '') +
          (item.linkType === 'external' ? 'timeline__itembox--external ' : '');
        const html = (
          <div>
            <div className={ className }>
              { item.icon ? <div className="timeline__itembox__imagebox"><img src={ item.icon } /></div> : '' }
              <div className="timeline__itembox__titlebox">
                {
                  item.link ?
                    <a href={ item.link } target={ item.linkType === 'external' ? '_blank' : '_self' }>
                      { item.title }
                    </a>
                    : item.title
                }
              </div>
            </div>
          </div>
        );
        return ReactDOM.render(html, element);
      },
      zoomMin: 1000 * 60 * 60 * 24 * 3,
      zoomMax: 1000 * 60 * 60 * 24 * 365 * (margin + 10),
    };
    /* eslint-disable no-new */
    new vis.Timeline(container, items, options);
  }


  render() {
    return (
      <div>
        <div className="timeline" ref="visTimeline" />
      </div>
    );
  }
}


TimelineComponent.propTypes = {
  data: React.PropTypes.any,
};
