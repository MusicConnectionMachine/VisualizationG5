import React from 'react';
import _ from 'lodash';
import { Alert, Input, Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

import RelationItem from './RelationItem.jsx';


export default class RelationList extends React.Component {
  constructor(props) {
    super(props);
    this.togglePopover = this.togglePopover.bind(this);

    this.state = {
      popoverOpen: false,
      alertOpen: false,
      popoverTitle: '',
      popoverContent: '',
      popoverTarget: '',
    };
  }

  togglePopover(relation = {}) {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen,
      popoverTitle: 'You are about to report the following relationshiop:',
      popoverContent: relation.entity1 + ' ' + relation.relation + ' ' + relation.entity2,
      popoverTarget: '_' + relation.id,
    }));
  }

  onDismiss() {
    this.setState({ alertOpen: false });
  }

  handleReport() {
    this.setState({ alertOpen: true, popoverOpen: false });
    setTimeout(() => {
      this.setState({ alertOpen: false });
    }, 3000)
  }

  render() {
    const { relations, className } = this.props;

    return (
      <div id="popoverTarget" className={`relation-widget__body ${className}`}>
        {_.map(relations, relation =>
          <RelationItem
            togglePopover={this.togglePopover}
            key={relation.id}
            className="relation-widget-list__item"
            relation={relation}
          />
        )}
        <Popover
          placement="bottom center"
          target={this.state.popoverTarget ? this.state.popoverTarget : 'popoverTarget'}
          isOpen={this.state.popoverOpen}
        >
          <PopoverTitle style={{ fontSize: '14px' }}>{this.state.popoverTitle}</PopoverTitle>
          <PopoverContent style={{ textAlign: 'center' }}>
            <div style={{ marginTop: '5px', marginBottom: '15px' }}> {this.state.popoverContent} </div>
            <Input style={{ fontSize: '14px' }} placeholder="optional comment..." />
            <Button
              onClick={() => this.handleReport()}
              style={{ float: 'right', marginTop: '15px', marginBottom: '5px', fontSize: '14px' }} color="primary"> Report </Button>
          </PopoverContent>
        </Popover>
        <Alert
          isOpen={this.state.alertOpen}
          toggle={() => this.onDismiss()}
          color="info" style={{ position: 'absolute', bottom: 0, left: 20, right: 20, height: '50px' }}>
          Thanks for your feedback. We'll have a look at it.
        </Alert>
      </div>
    );
  }
}


RelationList.propTypes = {
  relations: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
};
