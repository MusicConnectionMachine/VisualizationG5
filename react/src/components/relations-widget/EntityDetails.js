import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import createHighlightedText from './utils/createHighlightedText';
import PaginationComponent from './PaginationComponent';

const LIMIT = 5;
const MAX_PAGES = 10;

export default class EntityDetails extends React.Component {
  render() {
    const {
      entity2Relations,
      query,
      className,
      entity2RelationsPage,
      entity2,
      handleEntityRelationsPage,
    } = this.props;

    const displayRelations = entity2Relations.slice((entity2RelationsPage - 1) * LIMIT, entity2RelationsPage * LIMIT);

    return (
      <div id="popoverTarget" className={`relation-widget__body ${className}`}>
          <Row>
            <Col>
              {displayRelations.length > 0 &&
              <div
                key={displayRelations[0].id} id={'_' + displayRelations[0].id}
                className={`relation-item `}
                dangerouslySetInnerHTML={createHighlightedText(query, displayRelations[0].relation)}
              />
              }
            </Col>
            <Col>
              <div className={`relation-item `}>
                {entity2}
              </div>
            </Col>
          </Row>

          <Row className="relation-widget-list__item">
            <Col>
              {displayRelations.length > 1 &&
              <div
                key={displayRelations[1].id} id={'_' + displayRelations[1].id}
                className={`relation-item`}
                dangerouslySetInnerHTML={createHighlightedText(query, displayRelations[1].relation)}
              />}
            </Col>

            <Col>
              <div className={`relation-item`}>
                <p
                  onClick={() => this.props.showRelationList()}
                  style={{ color: '#0275d8', cursor: 'pointer' }}
                >
                  {`< Go Back to All Relations`}
                </p>
              </div>
            </Col>
          </Row>
          {_.map(displayRelations, (relation, index) => {
            return index > 1
              ? <Row key={relation.id} >
                  <Col>
                    <div
                      id={'_' + relation.id}
                      className={`relation-item relation-widget-list__item`}
                      dangerouslySetInnerHTML={createHighlightedText(query, relation.relation)}
                    />
                  </Col>
                  <Col> {null} </Col>
                </Row>
              : null;
          })}
        <PaginationComponent
          currentPage={entity2RelationsPage}
          itemCount={entity2Relations.length}
          handlePageChange={handleEntityRelationsPage}
          maxPages={MAX_PAGES}
          itemsPerPage={LIMIT}
        />
      </div>
    );
  }
}


EntityDetails.propTypes = {
  handleEntityRelationsPage: React.PropTypes.func.isRequired,
  query: React.PropTypes.string,
  entity2Relations: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  showRelationList: React.PropTypes.func,
  entity2RelationsPage: React.PropTypes.number,
  entity2: React.PropTypes.string,
};
