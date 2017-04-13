import React from 'react';
import { Popover, PopoverTitle, PopoverContent } from 'reactstrap';


export default class SourcePopover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      target,
      isOpen,
      source,
    } = this.props;

    return (
      <Popover
        placement="bottom"
        target={target}
        isOpen={isOpen}
      >
        <PopoverTitle className="popover__title">Source</PopoverTitle>
        <PopoverContent className="popover__content">
          <div>{source.text}</div>
          <div>{source.url}</div>
        </PopoverContent>
      </Popover>
    );
  }
}

SourcePopover.propTypes = {
  target: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  source: React.PropTypes.shape({
    text: React.PropTypes.string,
    url: React.PropTypes.string,
  }),
};
