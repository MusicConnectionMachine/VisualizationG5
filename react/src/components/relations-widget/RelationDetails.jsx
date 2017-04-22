import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import createHighlightedText from './utils/createHighlightedText';
import PaginationComponent from './PaginationComponent';

const LIMIT = 5;
const MAX_PAGES = 10;

export default class RelationDetails extends React.Component {
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
    const {
      query,
      className,
      relationEntities,
      relationEntitiesPage,
      relation,
      handleRelationEntitiesPage,
    } = this.props;

    const displayEntities = relationEntities.slice((relationEntitiesPage - 1) * LIMIT, relationEntitiesPage * LIMIT);

    return (
      <div id="popoverTarget" className={`relation-widget__body ${className}`}>
        <div className="relation-item">
          <Row className="relation-item__row">
            <Col>
                {relation.relation}
            </Col>
            <Col>
              {displayEntities.length > 0 &&
              <div
                key={displayEntities[0].id} id={'_' + displayEntities[0].id}
                dangerouslySetInnerHTML={createHighlightedText(query, displayEntities[0].entity2)}
              />
              }
            </Col>
          </Row>
        </div>
        <div className="relation-item">
          <Row className="relation-widget-list__item relation-item__row">
            <Col>
                <span
                  onClick={() => this.props.showRelationList()}
                  style={{ color: '#0275d8', cursor: 'pointer' }}
                >
                  {`< Go Back to All Relations`}
                </span>
            </Col>
            <Col>
              {displayEntities.length > 1 &&
              <div
                key={displayEntities[1].id}
                id={'_' + displayEntities[1].id}
                dangerouslySetInnerHTML={createHighlightedText(query, displayEntities[1].entity2)}
              />
              }
            </Col>
          </Row>
        </div>
          {_.map(displayEntities, (entity, index) => {
            return index > 1
              ? <div className="relation-item">
                <Row key={entity.id} className="relation-item__row">
                  <Col> {null} </Col>
                  <Col>
                    <div
                      id={'_' + entity.id}
                      className={`relation-widget-list__item`}
                      dangerouslySetInnerHTML={createHighlightedText(query, entity.entity2)}
                    />
                  </Col>
                </Row>
              </div>
              : null;
          })}
        <PaginationComponent
          currentPage={relationEntitiesPage}
          itemCount={relationEntities.length}
          handlePageChange={handleRelationEntitiesPage}
          maxPages={MAX_PAGES}
          itemsPerPage={LIMIT}
        />
      </div>
    );
  }
}


RelationDetails.propTypes = {
  handleRelationEntitiesPage: React.PropTypes.func.isRequired,
  query: React.PropTypes.string,
  relationEntities: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  showRelationList: React.PropTypes.func,
  relationEntitiesPage: React.PropTypes.number,
  relation: React.PropTypes.shape({

  }),
};
