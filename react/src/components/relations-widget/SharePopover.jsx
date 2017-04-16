import React from 'react';
import { Popover, PopoverTitle, PopoverContent, Button } from 'reactstrap';


export default class SharePopover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      target,
      isOpen,
      close,
      relation,
    } = this.props;

    return (
      <Popover
        placement="bottom"
        target={target}
        isOpen={isOpen}
      >
        <PopoverTitle className="popover__title">
          <Button
            onClick={() => close()}
            color="link"
            className="popover__close-button close-icon"
          />
          Share
        </PopoverTitle>
        <PopoverContent className="popover__content">
          <a href="https://twitter.com/share" data-text={`${relation.entity1}  ${relation.relation} ${relation.entity2}`} data-show-count="false">Tweet</a><script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </PopoverContent>
      </Popover>
    );
  }
}

SharePopover.propTypes = {
  target: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  close: React.PropTypes.func,
  relation: React.PropTypes.object,
};
