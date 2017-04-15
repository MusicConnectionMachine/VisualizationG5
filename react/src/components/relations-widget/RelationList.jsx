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
    this.closePopover = this.closePopover.bind(this);

    this.state = {
      popover: {
        sourcePopover: {
          isOpen: false,
        },
        flagPopover: {
          isOpen: false,
          content: '',
        },
        selectedRelation: {
          sources: [],
        },
      },
      alertOpen: false,
    };
  }

  onDismiss() {
    this.setState({ alertOpen: false });
  }

  toggleSourcePopover(relation = {}) {
    this.setState(prevState => {
      return _.merge({}, prevState,
        {
          popover: {
            sourcePopover: {
              isOpen: !_.isEqual(relation, prevState.popover.selectedRelation) ||
                      !prevState.popover.sourcePopover.isOpen,
            },
            flagPopover: {
              isOpen: false,
            },
            selectedRelation: relation,
          },
        }
      );
    });
  }

  // This is so DRY, You'll need a moisturizer
  closePopover() {
    this.setState({
      popover: {
        sourcePopover: {
          isOpen: false,
        },
        flagPopover: {
          isOpen: false,
          content: '',
        },
        selectedRelation: {
          sources: [],
        },
      },
    });
  }

  toggleFlagPopover(relation = {}) {
    this.setState(prevState => {
      return _.merge({}, prevState,
        {
          popover: {
            flagPopover: {
              isOpen: !_.isEqual(relation, prevState.popover.selectedRelation) ||
                      !prevState.popover.flagPopover.isOpen,
              content: relation.entity1 + ' ' + relation.relation + ' ' + relation.entity2,
            },
            sourcePopover: {
              isOpen: false,
            },
            selectedRelation: relation,
          },
        }
      );
    });
  }

  handleReport() {
    this.setState(prevState => {
      return _.merge({}, prevState,
        {
          popover: {
            flagPopover: {
              isOpen: false,
            },
          },
          alertOpen: true,
        }
      );
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
            showEntity2Details={this.props.showEntity2Details}
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
          isOpen={this.state.popover.flagPopover.isOpen}
          content={this.state.popover.flagPopover.content}
          handleSubmit={this.handleReport.bind(this)}
          close={this.closePopover}
        />
        <SourcePopover
          target={'relation-popover-target'}
          isOpen={this.state.popover.sourcePopover.isOpen}
          sources={this.state.popover.selectedRelation.sources}
          close={this.closePopover}
        />
        <Alert
          isOpen={this.state.alertOpen}
          toggle={() => this.onDismiss()}
          color="info" style={{ position: 'absolute', top: 230, left: 20, right: 20, height: '50px' }}
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
  showEntity2Details: React.PropTypes.func,
  page: React.PropTypes.number,
};
