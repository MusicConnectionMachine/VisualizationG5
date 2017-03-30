import * as ReactDOM from 'react-dom';
import _ from 'lodash';
import React from 'react';
import vis from 'vis';
import '../../../node_modules/vis/dist/vis.min.css';
import '../../../scss/timeline-app.scss';


export default class TimelineComponent extends React.Component {
  constructor(props) {
    super(props);
    this.dataSet = null;
  }


  componentDidMount() {
    if (this.props.events) {
      this.drawTimeline(this.props.events);
    }
  }


  componentWillReceiveProps(nextProps) {
    if (!this.dataSet) {
      this.drawTimeline(nextProps.events);
    } else {
      const oldEvents = this.props.events;
      const newEvents = nextProps.events;
      this.dataSet.remove(_.differenceBy(oldEvents, newEvents, event => event.id).map(event => event.id));
      this.dataSet.add(_.differenceBy(newEvents, oldEvents, event => event.id));
    }
  }


  /**
   * @param {Array} events
   */
  drawTimeline(events) {
    /* Prepare the data */
    /* eslint-disable no-shadow */
    const { max, min } = events.reduce(({ max, min }, event) => {
      event.start = new Date(event.start);
      if (event.description) {
        event.description = '<p>' + event.description.replace(/\n/g, '</p><p>') + '</p>';
      }
      return {
        max: event.start > max ? event.start : max,
        min: event.start < min ? event.start : min,
      };
    }, { max: -Infinity, min: Infinity });
    const margin = max.getYear() - min.getYear();

    /* Display the vis-timeline */
    const container = this.refs.visTimeline;
    this.dataSet = new vis.DataSet(events);
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
      height: '100%',
      orientation: 'top',
      selectable: false,
      showCurrentTime: false,
      template: (event, element) => {
        const className = 'timeline__body__itembox ' +
          (event.icon ? 'timeline__body__itembox--hasicon ' : '') +
          (event.linkType === 'external' ? 'timeline__body__itembox--external ' : '');
        const html = (
          <div>
            <div className={ className } id={ 'timeline__body__itembox__' + event.id }>
              { event.icon ? <div className="timeline__body__itembox__imagebox"><img src={ event.icon } /></div> : '' }
              <div className="timeline__body__itembox__titlebox">
                {
                  event.link ?
                    <a href={ event.link } target={ event.linkType === 'external' ? '_blank' : '_self' }>
                      { event.title }
                    </a>
                    : event.title
                }
              </div>
            </div>
          </div>
        );
        return ReactDOM.render(html, element);
      },
      zoomMin: 1000 * 60 * 60 * 24 * 3,
      zoomMax: 1000 * 60 * 60 * 24 * 365 * (margin + 10) * 2,
    };
    const timeline = new vis.Timeline(container, this.dataSet, options);

    /* Create the tooltips */
    events.forEach((event) => {
      const date = event.start;
      let tooltipContent = `<p class="timeline__body__tooltip__date">${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}</p>`;
      if (event.description) {
        tooltipContent += event.description;
      }
      tooltipContent += `<span class="timeline__body__tooltip__arrow"></span>`;
      const tooltipNode = document.createElement('div');
      tooltipNode.innerHTML = tooltipContent;
      tooltipNode.classList.add('timeline__body__tooltip');
      tooltipNode.id = 'timeline__body__tooltip__' + event.id;
      container.appendChild(tooltipNode);
    });
    // The event 'itemover' cannot be used because the original event will not be passed due to a bug.
    // It is already fixed by the developers but not included in the current release (4.18.1).
    // https://github.com/almende/vis/pull/2704
    let currentItem = null;
    timeline.on('mouseOver', (e) => {
      if (e.what === 'item' && currentItem !== e.item) {
        const tooltipNode = document.getElementById('timeline__body__tooltip__' + e.item);
        currentItem = e.item;
        if (tooltipNode) {
          const margin = 20;
          const tooltipWidth = tooltipNode.offsetWidth;
          const itemBoundaries =
            document.getElementById('timeline__body__itembox__' + e.item).parentNode.parentNode.parentNode.getBoundingClientRect();
          const mouseX = e.pageX;
          let left = mouseX;
          if (left + tooltipWidth + margin > window.innerWidth) {
            left = window.innerWidth - margin - tooltipWidth;
          }
          tooltipNode.style.left = left + 'px';
          tooltipNode.style.top = (itemBoundaries.bottom + 10) + 'px';
          const arrow = tooltipNode.getElementsByClassName('timeline__body__tooltip__arrow')[0];
          if (mouseX + 10 + margin < window.innerWidth) {
            arrow.style.left = (mouseX + 10) + 'px';
          } else {
            arrow.style.left = mouseX + 'px';
          }
          arrow.style.top = tooltipNode.style.top;
          tooltipNode.classList.add('timeline__body__tooltip--visible');
        }
      }
    });
    timeline.on('itemout', (e) => {
      currentItem = null;
      const tooltipNode = document.getElementById('timeline__body__tooltip__' + e.item);
      if (tooltipNode) {
        tooltipNode.classList.remove('timeline__body__tooltip--visible');
      }
    });
  }


  render() {
    return (
      <div className="timeline__body" ref="visTimeline" />
    );
  }
}


TimelineComponent.propTypes = {
  events: React.PropTypes.array,
};
