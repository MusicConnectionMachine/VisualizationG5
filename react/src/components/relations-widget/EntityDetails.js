import React from 'react';
import _ from 'lodash';
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const LIMIT = 5;
const MAX_PAGES = 10;

export default class EntityDetails extends React.Component {
  render() {
    const { entity2Relations, className, entity2RelationsPage, entity2 } = this.props;

    const numberPages = Math.min(MAX_PAGES, Math.ceil(entity2Relations.length / LIMIT));
    const displayRelations = entity2Relations.slice((entity2RelationsPage - 1) * LIMIT, entity2RelationsPage * LIMIT);

    return (
      <div id="popoverTarget" className={`relation-widget__body ${className}`}>
        {displayRelations.length > 2 &&
        <div>
          <Row>
            <Col>
              <div
                key={displayRelations[0].id} id={'_' + displayRelations[0].id}
                className={`relation-item `}
              >
                {displayRelations[0].relation}
              </div>
            </Col>
            <Col>
              <div className={`relation-item `}>
                {entity2}
              </div>
            </Col>
          </Row>

          <Row className="relation-widget-list__item">
            <Col>
              <div
                key={displayRelations[1].id} id={'_' + displayRelations[1].id}
                className={`relation-item`}
              >
                {displayRelations[1].relation}
              </div>
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
                    <div id={'_' + relation.id} className={`relation-item relation-widget-list__item`}>
                      {relation.relation}
                    </div>
                  </Col>
                  <Col> {null} </Col>
                </Row>
              : null;
          })}
        </div>
        }
        <Pagination style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {new Array(numberPages).fill(undefined).map((____, index) =>
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                style={ index + 1 === entity2RelationsPage ? { backgroundColor: '#DDDDDD', fontColor: '#004d90' } : {}}
                onClick={() => this.props.handleEntityRelationsPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          )}
        </Pagination>
      </div>
    );
  }
}


EntityDetails.propTypes = {
  handleEntityRelationsPage: React.PropTypes.func.isRequired,
  entity2Relations: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  showRelationList: React.PropTypes.func,
  entity2RelationsPage: React.PropTypes.number,
  entity2: React.PropTypes.string,
};
