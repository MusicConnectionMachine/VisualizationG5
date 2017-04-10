import React from 'react';
import { Button, Row, Col } from 'reactstrap';


export default class RelationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
      showPopover: false,
    };
  }

  render() {
    const { relation, className } = this.props;

    return (
      <div id={'_' + relation.id} className={`relation-item ${className}`}>
        <Row
          onMouseOver={() => this.setState({ mouseOver: true })}
          onMouseOut={() => this.setState({ mouseOver: false })}
        >
          <Col>{ relation.relation }</Col>
          <Col>{ relation.entity2 }</Col>
          <Col style={ this.state.mouseOver ? {} : { visibility: 'hidden' } }>
            <Button
              onClick={() => this.props.togglePopover(relation)}
              color="link"
              style={{ position: 'absolute', right: '20px', top: '-7px', fontSize: '14px' }}
            >
              Source | Flag
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}


RelationItem.propTypes = {
  relation: React.PropTypes.any,
  className: React.PropTypes.string,
  togglePopover: React.PropTypes.func,
};
