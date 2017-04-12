import React from 'react';
import _ from 'lodash';
import { Pagination, PaginationItem, PaginationLink, Alert } from 'reactstrap';

import RelationItem from './RelationItem';
import FlagPopover from './FlagPopover';
import SourcePopover from './SourcePopover';

const LIMIT = 5;
const MAX_PAGES = 10;

export default class RelationList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSourcePopover = this.toggleSourcePopover.bind(this);
    this.toggleFlagPopover = this.toggleFlagPopover.bind(this);

    this.state = {
      popover: {
        isOpen: {
          source: false,
          flag: false,
        },
        selectedRelation: {
          source: {
            text: '',
            url: '',
          }
        },
        content: '',
      },
      alertOpen: false,
    };
  }

  onDismiss() {
    this.setState({ alertOpen: false });
  }

  toggleSourcePopover(relation = {}) {

    this.setState(prevState => {
      // TODO: Extend state to avoid overwriting
      //var newPopoverState = _.extend({}, prevState.selected);
      return ({
        popover: {
          isOpen: {
            source: !_.isEqual(relation, prevState.popover.selectedRelation),
          },
          selectedRelation: relation,
        },
      });
    });
  }

  toggleFlagPopover(relation = {}) {
    this.setState(prevState => ({
      popover: {
        flag: {
          source: !_.isEqual(relation, prevState.popover.selectedRelation),
        },
        selectedRelation: relation,
        content: relation.entity1 + ' ' + relation.relation + ' ' + relation.entity2,
      },
    }));
  }

  handleReport() {
    this.setState({
      alertOpen: true,
      popover: {
        isOpen: {
          flag: false,
        },
      },
    });
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
        <Pagination id="relation-popover-target" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {new Array(numberPages).fill(undefined).map((____, index) =>
            <PaginationItem key={index}>
              <PaginationLink style={ index + 1 === page ? { backgroundColor: '#DDDDDD', fontColor: '#004d90' } : {}} href="#" onClick={() => this.props.handlePageChange(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          )}
        </Pagination>

        <FlagPopover
          target={'relation-popover-target'}
          isOpen={this.state.popover.isOpen.flag}
          content={this.state.popover.content}
          handleSubmit={this.handleReport}
        />
        <SourcePopover
          target={'relation-popover-target'}
          isOpen={this.state.popover.isOpen.source}
          source={this.state.popover.selectedRelation.source}
        />
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
