import React from 'react';
import _ from 'lodash';
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

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
    const { relationEntities, className, relationEntitiesPage, relation } = this.props;

    const numberPages = Math.min(MAX_PAGES, Math.ceil(relationEntities.length / LIMIT));
    const displayEntities = relationEntities.slice((relationEntitiesPage - 1) * LIMIT, relationEntitiesPage * LIMIT);

    return (
      <div id="popoverTarget" className={`relation-widget__body ${className}`}>
          <Row>
            <Col>
              <div className={`relation-item `}>
                {relation.relation}
              </div>
            </Col>
            <Col>
              {displayEntities.length > 0 &&
              <div
                key={displayEntities[0].id} id={'_' + displayEntities[0].id}
                className={`relation-item `}
              >
                {displayEntities[0].entity2}
              </div>
              }
            </Col>
          </Row>

          <Row className="relation-widget-list__item">
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
            <Col>
              {displayEntities.length > 1 &&
              <div
                key={displayEntities[1].id} id={'_' + displayEntities[1].id}
                className={`relation-item`}
              >
                {displayEntities[1].entity2}
              </div>
              }
            </Col>
          </Row>
          {_.map(displayEntities, (entity, index) => {
            return index > 1
              ? <Row key={entity.id} >
                  <Col> {null} </Col>
                  <Col>
                    <div id={'_' + entity.id} className={`relation-item relation-widget-list__item`}>
                      {entity.entity2}
                    </div>
                  </Col>
                </Row>
              : null;
          })}
        <Pagination style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {new Array(numberPages).fill(undefined).map((____, index) =>
            <PaginationItem key={index}>
              <PaginationLink style={ index + 1 === relationEntitiesPage ? { backgroundColor: '#DDDDDD', fontColor: '#004d90' } : {}} href="#" onClick={() => this.props.handleRelationEntitiesPage(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          )}
        </Pagination>
      </div>
    );
  }
}


RelationDetails.propTypes = {
  handleRelationEntitiesPage: React.PropTypes.func.isRequired,
  relationEntities: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  showRelationList: React.PropTypes.func,
  relationEntitiesPage: React.PropTypes.number,
  relation: React.PropTypes.shape({

  }),
};
