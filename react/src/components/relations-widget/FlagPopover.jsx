import React from 'react';
import { Popover, PopoverTitle, PopoverContent, Input, Button } from 'reactstrap';
import ClickOutside from 'react-click-outside';

import DimmedBackground from './DimmedBackground';

export default class FlagPopover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      target,
      isOpen,
      handleSubmit,
      close,
      relation,
    } = this.props;

    return (
      <div>
        <DimmedBackground isShown={isOpen} />
        <Popover
          placement="top"
          target={target}
          isOpen={isOpen}
        >
          <ClickOutside onClickOutside={() => close()}>
            <PopoverTitle className="popover__title">
              <Button
                onClick={() => close()}
                color="link"
                className="popover__close-button close-icon"
              />
              Report a problem
              <Button className="popover__balance-button" />
            </PopoverTitle>
            <PopoverContent className="popover__content">
              <p>You are about to report the following relationship:</p>
              <span className="popover__content__relation"> {relation.entity1 + ' ' + relation.relation + ' ' + relation.entity2} </span>
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
          </ClickOutside>
        </Popover>
      </div>
    );
  }
}

FlagPopover.propTypes = {
  target: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func,
  close: React.PropTypes.func,
  relation: React.PropTypes.object,
};
