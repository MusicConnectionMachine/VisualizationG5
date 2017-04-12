import React from 'react';
import { Popover, PopoverTitle, PopoverContent } from 'reactstrap';


export default class FlagPopover extends React.Component {
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
        <PopoverTitle style={{ fontSize: '16px' }}>Source</PopoverTitle>
        <PopoverContent style={{ textAlign: 'center' }}>
          <div> {source.text} </div>
          <div> {source.url} </div>
        </PopoverContent>
      </Popover>
    );
  }
}

FlagPopover.propTypes = {
  target: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  source: React.PropTypes.shape({
    text: React.PropTypes.string,
    url: React.PropTypes.number,
  }),
};
