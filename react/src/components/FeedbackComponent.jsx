import React from 'react';
import ReactToolTip from 'react-tooltip';
import '../../scss/feedback-component.scss';


export default function FeedbackComponent(props) {
  const { onLiked, onDisliked, onMarkedAsWrong } = props;
  return (
    <div>
      <a href="#" data-event="click" data-tip>
        <div>
          <svg height="24" width="4" className="Feedback__popover">
            <circle r="2" cx="2" cy="2" />
            <circle r="2" cx="2" cy="8" />
            <circle r="2" cx="2" cy="14" />
          </svg>
        </div>
      </a>
      <ReactToolTip globalEventOff="click" class="Feedback__tooltip">
        <div className="btn-group-vertical">
          <button type="button" className="btn btn-secondary" onClick={onLiked}>
            Very interesting!
          </button>
          <button type="button" className="btn btn-secondary" onClick={onDisliked}>
            Less interesting!
          </button>
          <button type="button" className="btn btn-secondary" onClick={onMarkedAsWrong}>
            Wrong information!
          </button>
        </div>
      </ReactToolTip>
    </div>
  );
}


FeedbackComponent.propTypes = {
  onLiked: React.PropTypes.func.isRequired,
  onDisliked: React.PropTypes.func.isRequired,
  onMarkedAsWrong: React.PropTypes.func.isRequired,
};
