import * as ReactDOM from 'react-dom';
import _ from 'lodash';
import NotificationSystem from 'react-notification-system';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import vis from 'vis';
import '../../../node_modules/vis/dist/vis.min.css';
import '../../../scss/timeline-app.scss';
import FeedbackComponent from '../FeedbackComponent';


export default class TimelineComponent extends React.Component {
  constructor(props) {
    super(props);
    this.dataSet = null;
    this.notificationSystem = null;
    this.state = {
      timelineReady: false,
    };
  }


  componentDidMount() {
    this.drawTimeline(this.props.events);
  }


  componentWillReceiveProps(nextProps) {
    const oldEvents = this.props.events;
    const newEvents = nextProps.events;
    this.dataSet.remove(_.differenceBy(oldEvents, newEvents, event => event.id).map(event => event.id));
    this.dataSet.add(_.differenceBy(newEvents, oldEvents, event => event.id));
  }


  handleFeedback(e, eventId) { // eslint-disable-line
    // TODO Send feedback to the back-end
    this.notificationSystem.addNotification({
      message: 'Thank you for the feedback!',
      level: 'success',
      position: 'tc',
      autoDismiss: 2,
    });
  }


  /**
   * @param {Array} events
   */
  drawTimeline(events) {
    /* Prepare the data */
    /* eslint-disable no-shadow */
    const { max, min } = events.reduce(({ max, min }, event) => ({
      max: event.start > max ? event.start : max,
      min: event.start < min ? event.start : min,
    }), { max: -Infinity, min: Infinity });
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
        const className = `timeline__body__itembox ${
          event.icon ? 'timeline__body__itembox--hasicon ' : ''
          }${event.linkType === 'external' ? 'timeline__body__itembox--external ' : ''}`;
        const html = (
          <div>
            <div className={className} id={`timeline__body__itembox__${event.id}`}>
              { event.icon ? <div className="timeline__body__itembox__imagebox"><img src={event.icon} /></div> : '' }
              <FeedbackComponent
                onLiked={this.handleFeedback.bind(this, event.id)}
                onDisliked={this.handleFeedback.bind(this, event.id)}
                onMarkedAsWrong={this.handleFeedback.bind(this, event.id)}
              />
              <div
                className="timeline__body__itembox__titlebox"
                data-for={`timeline__body__tooltip__${event.id}`} data-tip
              >
                {
                  event.link ?
                    <a href={event.link} target={event.linkType === 'external' ? '_blank' : '_self'}>
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
    new vis.Timeline(container, this.dataSet, options); // eslint-disable-line no-new
    this.setState({ timelineReady: true });
  }


  render() {
    return (
      <div>
        <div className="widget__body timeline__body" ref="visTimeline" />
        {this.state.timelineReady && this.props.events.map(({ id, start, description }) => (
          <ReactTooltip id={`timeline__body__tooltip__${id}`} key={id}>
            <p className="timeline__body__tooltip__date">
              {start.getDate()}.{start.getMonth() + 1}.{start.getFullYear()}
            </p>
            {description && description.split('\n').map(p => <p>{p}</p>)}
          </ReactTooltip>
        ))}
        <NotificationSystem ref={(ns) => { this.notificationSystem = ns; }} />
      </div>
    );
  }
}


TimelineComponent.propTypes = {
  events: React.PropTypes.array.isRequired,
};
