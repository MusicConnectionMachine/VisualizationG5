import React from 'react';
import _ from 'lodash';
import { Alert } from 'reactstrap';

import RelationItem from './RelationItem';
import FlagPopover from './FlagPopover';
import SourcePopover from './SourcePopover';
import SharePopover from './SharePopover';
import PaginationComponent from './PaginationComponent';

const LIMIT = 5;
const MAX_PAGES = 10;

export default class RelationList extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSourcePopover = this.toggleSourcePopover.bind(this);
    this.toggleFlagPopover = this.toggleFlagPopover.bind(this);
    this.toggleSharePopover = this.toggleSharePopover.bind(this);
    this.closePopover = this.closePopover.bind(this);

    this.state = {
      popover: {
        sourcePopover: {
          isOpen: false,
        },
        flagPopover: {
          isOpen: false,
        },
        sharePopover: {
          isOpen: false,
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
            sharePopover: {
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
        },
        sharePopover: {
          isOpen: false,
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
            },
            sourcePopover: {
              isOpen: false,
            },
            sharePopover: {
              isOpen: false,
            },
            selectedRelation: relation,
          },
        }
      );
    });
  }

  toggleSharePopover(relation = {}) {
    this.setState(prevState => {
      return _.merge({}, prevState,
        {
          popover: {
            sharePopover: {
              isOpen: !_.isEqual(relation, prevState.popover.selectedRelation) ||
                      !prevState.popover.sharePopover.isOpen,
            },
            flagPopover: {
              isOpen: false,
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
    const {
      query,
      className,
      relations,
      page,
      handlePageChange,
      isRelationDetails,
      isEntityDetails,
    } = this.props;

    const displayRelations = relations.slice((page - 1) * LIMIT, page * LIMIT);

    return (
      <div className={`relation-widget__body ${className}`}>
        {_.map(displayRelations, (relation, index) =>
          <RelationItem
            showRelationDetails={this.props.showRelationDetails}
            showEntityDetails={this.props.showEntityDetails}
            showRelationList={this.props.showRelationList}
            toggleSourcePopover={this.toggleSourcePopover}
            toggleFlagPopover={this.toggleFlagPopover}
            toggleSharePopover={this.toggleSharePopover}
            query={query}
            key={relation.id}
            className={ index !== 0 ? 'relation-widget-list__item' : '' }
            relation={relation}
            isRelationDetails={isRelationDetails}
            isEntityDetails={isEntityDetails}
            index={index}
          />
        )}
        <PaginationComponent
          currentPage={page}
          itemCount={relations.length}
          handlePageChange={handlePageChange}
          maxPages={MAX_PAGES}
          itemsPerPage={LIMIT}
        />
        <FlagPopover
          target={'relation-popover-target'}
          isOpen={this.state.popover.flagPopover.isOpen}
          relation={this.state.popover.selectedRelation}
          handleSubmit={this.handleReport.bind(this)}
          close={this.closePopover}
        />
        <SourcePopover
          target={'relation-popover-target'}
          isOpen={this.state.popover.sourcePopover.isOpen}
          sources={this.state.popover.selectedRelation.sources}
          close={this.closePopover}
        />
        <SharePopover
          target={'relation-popover-target'}
          isOpen={this.state.popover.sharePopover.isOpen}
          relation={this.state.popover.selectedRelation}
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

RelationList.defaultProps = {
  isRelationDetails: false,
  isEntityDetails: false,
};

RelationList.propTypes = {
  relations: React.PropTypes.array.isRequired,
  query: React.PropTypes.string,
  className: React.PropTypes.string,
  handlePageChange: React.PropTypes.func,
  showRelationDetails: React.PropTypes.func,
  showEntityDetails: React.PropTypes.func,
  showRelationList: React.PropTypes.func,
  page: React.PropTypes.number,
  isRelationDetails: React.PropTypes.bool,
  isEntityDetails: React.PropTypes.bool,
};
