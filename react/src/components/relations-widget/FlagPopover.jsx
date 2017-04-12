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
    } = this.props;

    return (
      <Popover
        placement="top"
        target={target}
        isOpen={isOpen}
      >
        <PopoverTitle style={{ fontSize: '16px' }}>
          Flag
        </PopoverTitle>
        <PopoverContent style={{ textAlign: 'center' }}>
          <p> <b> You are about to report the following relationship: </b> </p>
          <div style={{ marginBottom: '15px' }}> {content} </div>
          <Input
            style={{ fontSize: '14px' }}
            placeholder="optional comment..."
          />
          <Button
            onClick={() => handleSubmit()}
            style={{
              float: 'right',
              marginTop: '15px',
              marginBottom: '5px',
              fontSize: '14px'
            }}
            color="primary"
          >
            Report
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
};
