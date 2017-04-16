import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import createHighlightedText from './utils/createHighlightedText';


export default class RelationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
    };
  }

  render() {
    const { relation, className, query } = this.props;

    return (
      <div className={`relation-item ${className}`}>
        <Row
          onMouseOver={() => this.setState({ mouseOver: true })}
          onMouseOut={() => this.setState({ mouseOver: false })}
        >
          <Col
            id={'_' + relation.id}
            style={{ cursor: 'pointer' }}
            onClick={() => this.props.showRelationDetails(relation)}
            dangerouslySetInnerHTML={createHighlightedText(query, relation.relation)}
          />
          <Col
            id={'__' + relation.id}
            style={{ cursor: 'pointer' }}
            onClick={() => this.props.showEntity2Details(relation.entity2)}
            dangerouslySetInnerHTML={createHighlightedText(query, relation.entity2)}
          />
          <Col style={ this.state.mouseOver ? {} : { visibility: 'hidden' } }>
            <Button
              onClick={() => this.props.toggleSharePopover(relation)}
              color="link"
              className="relation-item__button share-icon"
            />
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
  query: React.PropTypes.string,
  className: React.PropTypes.string,
  toggleFlagPopover: React.PropTypes.func,
  toggleSourcePopover: React.PropTypes.func,
  toggleSharePopover: React.PropTypes.func,
  showRelationDetails: React.PropTypes.func,
  showEntity2Details: React.PropTypes.func,
};
