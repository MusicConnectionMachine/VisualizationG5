import React from 'react';
import _ from 'lodash';
import { Pagination, PaginationItem, PaginationLink, Alert, Input, Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

import RelationItem from './RelationItem.jsx';

const LIMIT = 5;
const MAX_PAGES = 10;

export default class RelationList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSourcePopover = this.toggleSourcePopover.bind(this);
    this.toggleFlagPopover = this.toggleFlagPopover.bind(this);

    this.state = {
      flagPopoverOpen: false,
      sourcePopoverOpen: false,
      alertOpen: false,
      popoverTitle: '',
      popoverContent: '',
      popoverTarget: '',
      sourceRelation: {
        source: {
          text: '',
          url: '',
        },
      },
      flagRelation: {
        source: {
          text: '',
          url: '',
        },
      },
    };
  }

  onDismiss() {
    this.setState({ alertOpen: false });
  }

  toggleSourcePopover(relation = {}) {
    this.setState(prevState => {
      return ({
        sourceRelation: relation,
        sourcePopoverOpen: !_.isEqual(relation, prevState.sourceRelation),
        popoverTitle: 'Sources',
        popoverTarget: '_' + relation.id,
      });
    });
  }

  toggleFlagPopover(relation = {}) {
    this.setState(prevState => ({
      flagPopoverOpen: !_.isEqual(relation, prevState.flagRelation),
      flagRelation: relation,
      popoverTitle: 'Flag',
      popoverContent: relation.entity1 + ' ' + relation.relation + ' ' + relation.entity2,
      popoverTarget: '_' + relation.id,
    }));
  }

  handleReport() {
    this.setState({ alertOpen: true, flagPopoverOpen: false });
    setTimeout(() => {
      this.setState({ alertOpen: false });
    }, 3000);
  }

  render() {
    const { relations, className, page } = this.props;

    const numberPages = Math.min(MAX_PAGES, Math.ceil(relations.length / LIMIT));
    const displayRelations = relations.slice((page - 1) * LIMIT, page * LIMIT);
    return (
      <div className={`relation-widget__body ${className}`}>
        {_.map(displayRelations, (relation, index) =>
          <RelationItem
            showRelationDetails={this.props.showRelationDetails}
            toggleSourcePopover={this.toggleSourcePopover}
            toggleFlagPopover={this.toggleFlagPopover}
            key={relation.id}
            className={ index !== 0 ? 'relation-widget-list__item' : '' }
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
          placement="top"
          target={'_' + this.state.popoverTarget}
          isOpen={this.state.flagPopoverOpen}
        >
          <PopoverTitle style={{ fontSize: '16px' }}>Flag</PopoverTitle>
          <PopoverContent style={{ textAlign: 'center' }}>
            <p> <b> You are about to report the following relationship: </b> </p>
            <div style={{ marginBottom: '15px' }}> {this.state.popoverContent} </div>
            <Input style={{ fontSize: '14px' }} placeholder="optional comment..." />
            <Button
              onClick={() => this.handleReport()}
              style={{ float: 'right', marginTop: '15px', marginBottom: '5px', fontSize: '14px' }} color="primary"
            >
              Report
            </Button>
          </PopoverContent>
        </Popover>
        <Popover
          placement="bottom"
          target={this.state.popoverTarget}
          isOpen={this.state.sourcePopoverOpen}
        >
          <PopoverTitle style={{ fontSize: '16px' }}>Source</PopoverTitle>
          <PopoverContent style={{ textAlign: 'center' }}>
            <div> {this.state.sourceRelation.source.text} </div>
            <div> {this.state.sourceRelation.source.url} </div>
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
  showRelationDetails: React.PropTypes.func,
  page: React.PropTypes.number,
};
