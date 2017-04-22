import React from 'react';
import { Popover, PopoverTitle, PopoverContent, Button } from 'reactstrap';
import { ShareButtons, generateShareIcon } from 'react-share';

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

    const {
      FacebookShareButton,
      GooglePlusShareButton,
      TwitterShareButton,
    } = ShareButtons;

    const TwitterIcon = generateShareIcon('twitter');
    const FacebookIcon = generateShareIcon('facebook');
    const GooglePlusIcon = generateShareIcon('google');

    const url = 'http://musicconnectionmachine.org/';
    const shareText = `Just found on #MusicConnectionMachine: ${relation.entity1}  ${relation.relation} ${relation.entity2}`;

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
          <Button className="popover__balance-button" />
        </PopoverTitle>
        <PopoverContent className="popover__content">
          <div>
            {'Just found on #MusicConnectionMachine:'}
            <br />
            {`${relation.entity1} ${relation.relation} ${relation.entity2}`}
          </div>
          <FacebookShareButton
            className="popover__content__share-button"
            url={url}
            title="MusicConnectionMachine"
            description={shareText}
          >
            <FacebookIcon size={64} />
          </FacebookShareButton>
          <TwitterShareButton
            className="popover__content__share-button"
            url={url}
            title={shareText}
          >
            <TwitterIcon size={64} />
          </TwitterShareButton>
          <GooglePlusShareButton
            className="popover__content__share-button"
            url={url}
          >
            <GooglePlusIcon size={64} />
          </GooglePlusShareButton>
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
