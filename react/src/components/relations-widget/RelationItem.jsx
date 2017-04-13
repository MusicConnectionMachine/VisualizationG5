import React from 'react';
import { Button, Row, Col } from 'reactstrap';


export default class RelationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
    };
  }

  render() {
    const { relation, className } = this.props;

    return (
      <div className={`relation-item ${className}`}>
        <Row
          onMouseOver={() => this.setState({ mouseOver: true })}
          onMouseOut={() => this.setState({ mouseOver: false })}
        >
          <Col id={'_' + relation.id} > <span style={{ cursor: 'pointer' }} onClick={() => this.props.showRelationDetails(relation)}> { relation.relation } </span> </Col>
          <Col id={'__' + relation.id} >{ relation.entity2 } </Col>
          <Col style={ this.state.mouseOver ? {} : { visibility: 'hidden' } }>
            <Button
              onClick={() => this.props.toggleSourcePopover(relation)}
              color="link"
              className="relation-item__button reference-icon"
            />
            <Button
              onClick={() => this.props.toggleFlagPopover(relation)}
              color="link"
              className="relation-item__button flag-icon"
            />
          </Col>
        </Row>
      </div>
    );
  }
}


RelationItem.propTypes = {
  relation: React.PropTypes.any,
  className: React.PropTypes.string,
  toggleFlagPopover: React.PropTypes.func,
  toggleSourcePopover: React.PropTypes.func,
  showRelationDetails: React.PropTypes.func,
};
