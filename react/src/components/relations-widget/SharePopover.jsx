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
        </PopoverTitle>
        <PopoverContent className="popover__content">
          <FacebookShareButton
            url={url}
            title="MusicConnectionMachine"
            description={shareText}
            style={{ cursor: 'pointer' }}
          >
            <FacebookIcon size={50} />
          </FacebookShareButton>
          <TwitterShareButton
            url={url}
            title={shareText}
            style={{ cursor: 'pointer' }}
          >
            <TwitterIcon size={50} />
          </TwitterShareButton>
          <GooglePlusShareButton
            url={url}
            style={{ cursor: 'pointer' }}
          >
            <GooglePlusIcon size={50} />
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
