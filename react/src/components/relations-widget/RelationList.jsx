import React from 'react';
import _ from 'lodash';
import { Pagination, PaginationItem, PaginationLink, Alert, Input, Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

import RelationItem from './RelationItem.jsx';

const LIMIT = 5;
const MAX_PAGES = 10;

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

  onDismiss() {
    this.setState({ alertOpen: false });
  }

  togglePopover(relation = {}) {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen,
      popoverTitle: 'You are about to report the following relationshiop:',
      popoverContent: relation.entity1 + ' ' + relation.relation + ' ' + relation.entity2,
      popoverTarget: '_' + relation.id,
    }));
  }

  handleReport() {
    this.setState({ alertOpen: true, popoverOpen: false });
    setTimeout(() => {
      this.setState({ alertOpen: false });
    }, 3000);
  }

  render() {
    const { relations, className, page } = this.props;

    const numberPages = Math.min(MAX_PAGES, Math.ceil(relations.length / LIMIT));
    const displayRelations = relations.slice((page - 1) * LIMIT, page * LIMIT);

    return (
      <div id="popoverTarget" className={`relation-widget__body ${className}`}>
        {_.map(displayRelations, relation =>
          <RelationItem
            togglePopover={this.togglePopover}
            key={relation.id}
            className="relation-widget-list__item"
            relation={relation}
          />
        )}
        <Pagination style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {new Array(numberPages).fill(undefined).map((____, index) =>
            <PaginationItem key={index}>
              <PaginationLink style={ index + 1 === page ? { backgroundColor: '#DDDDDD', fontColor: '#004d90' } : {}} href="#" onClick={() => this.props.handlePageChange(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          )}
        </Pagination>

        <Popover
          placement="top center"
          target={this.state.popoverTarget ? this.state.popoverTarget : 'popoverTarget'}
          isOpen={this.state.popoverOpen}
        >
          <PopoverTitle style={{ fontSize: '14px' }}>{this.state.popoverTitle}</PopoverTitle>
          <PopoverContent style={{ textAlign: 'center' }}>
            <div style={{ marginTop: '5px', marginBottom: '15px' }}> {this.state.popoverContent} </div>
            <Input style={{ fontSize: '14px' }} placeholder="optional comment..." />
            <Button
              onClick={() => this.handleReport()}
              style={{ float: 'right', marginTop: '15px', marginBottom: '5px', fontSize: '14px' }} color="primary"
            >
              Report
            </Button>
          </PopoverContent>
        </Popover>
        <Alert
          isOpen={this.state.alertOpen}
          toggle={() => this.onDismiss()}
          color="info" style={{ position: 'absolute', top: 330, left: 20, right: 20, height: '50px' }}
        >
          Thanks for your feedback. We'll have a look at it.
        </Alert>
      </div>
    );
  }
}


RelationList.propTypes = {
  relations: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  handlePageChange: React.PropTypes.func,
  page: React.PropTypes.number,
};
