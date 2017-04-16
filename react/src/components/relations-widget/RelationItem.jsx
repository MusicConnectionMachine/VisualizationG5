import React from 'react';
import { Button, Row, Col } from 'reactstrap';


export default class RelationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
    };
    this.createHighlightedText = this.createHighlightedText.bind(this);
  }

  createHighlightedText(query, text) {
    if (query.length >= 2) {
      const regex = new RegExp('(' + query + ')', 'gi');
      return { __html: text.replace(regex, '<span class="highlight">$1</span>') };
    }
    return { __html: text };
  }

  render() {
    const { relation, className, query } = this.props;

    return (
      <div className={`relation-item ${className}`}>
        <Row
          onMouseOver={() => this.setState({ mouseOver: true })}
          onMouseOut={() => this.setState({ mouseOver: false })}
        >
          <Col id={'_' + relation.id} >
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => this.props.showRelationDetails(relation)}
              dangerouslySetInnerHTML={this.createHighlightedText(query, relation.relation)}
            />
          </Col>
          <Col
            id={'__' + relation.id}
            style={{ cursor: 'pointer' }}
            onClick={() => this.props.showEntity2Details(relation.entity2)}
            dangerouslySetInnerHTML={this.createHighlightedText(query, relation.entity2)}
          />
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
  query: React.PropTypes.string,
  className: React.PropTypes.string,
  toggleFlagPopover: React.PropTypes.func,
  toggleSourcePopover: React.PropTypes.func,
  showRelationDetails: React.PropTypes.func,
  showEntity2Details: React.PropTypes.func,
};
