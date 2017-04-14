import React from 'react';
import { Popover, PopoverTitle, PopoverContent, Input, Button } from 'reactstrap';


export default class FlagPopover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      target,
      isOpen,
      content,
      handleSubmit,
      close,
    } = this.props;

    return (
      <Popover
        placement="top"
        target={target}
        isOpen={isOpen}
      >
        <PopoverTitle className="popover__title">
          <span style={{ float: 'right', cursor: 'pointer', color: '#0275d8' }} onClick={() => close()}> Close </span>
          Report a problem
        </PopoverTitle>
        <PopoverContent className="popover__content">
          <p>You are about to report the following relationship:</p>
          <span> {content} </span>
          <Input
            style={{ fontSize: '14px', width: '300px', margin: '0 auto' }}
            placeholder="Optional comment..."
          />
          <Button
            onClick={() => handleSubmit()}
            style={{
              marginTop: '15px',
              fontSize: '14px',
            }}
            color="primary"
          >
            Submit Report
          </Button>
        </PopoverContent>
      </Popover>
    );
  }
}

FlagPopover.propTypes = {
  target: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  content: React.PropTypes.string,
  handleSubmit: React.PropTypes.func,
  close: React.PropTypes.func,
};
