import React from 'react';
import _ from 'lodash';
import { Popover, PopoverTitle, PopoverContent, Button } from 'reactstrap';


export default class SourcePopover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      target,
      isOpen,
      sources,
      close,
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
          Sources
        </PopoverTitle>
        <PopoverContent className="popover__content popover__content--source">
          {_.map(sources, source =>
            <div className="popover__content__source-item" key={source.id}>
              <p>{source.text}</p>
              <a href={source.url}>{source.url}</a>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }
}

SourcePopover.propTypes = {
  target: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  sources: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    text: React.PropTypes.string,
    url: React.PropTypes.string,
  })),
  close: React.PropTypes.func,
};
