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
    const {
      relation,
      className,
      query,
      isRelationDetails,
      isEntityDetails,
      index,
    } = this.props;

    const optionsCol1 = {};
    optionsCol1.dangerouslySetInnerHTML = createHighlightedText(query, relation.relation);
    if (isRelationDetails) {
      if (index === 1) {
        optionsCol1.dangerouslySetInnerHTML = {
          __html: '<span style="color: #0275d8">< Go Back to All Relations</span>',
        };
      }
      if (index > 1) {
        optionsCol1.dangerouslySetInnerHTML = { __html: null };
      }
    }

    const optionsCol2 = {};
    optionsCol2.dangerouslySetInnerHTML = createHighlightedText(query, relation.entity2);
    if (isEntityDetails) {
      if (index === 1) {
        optionsCol2.dangerouslySetInnerHTML = {
          __html: '<span style="color: #0275d8">< Go Back to All Relations</span>',
        };
      }
      if (index > 1) {
        optionsCol2.dangerouslySetInnerHTML = { __html: null };
      }
    }

    return (
      <div className={`relation-item ${className}`}>
        <Row
          onMouseOver={() => this.setState({ mouseOver: true })}
          onMouseOut={() => this.setState({ mouseOver: false })}
          className="relation-item__row"
        >
          <Col
            id={'_' + relation.id}
            className="relation-item__relation"
            onClick={() => {
              if (isRelationDetails && index === 1) {
                this.props.showRelationList();
              } else {
                this.props.showRelationDetails(relation.relation);
              }
            }}
            {...optionsCol1}
          />
          <Col
            id={'__' + relation.id}
            className="relation-item__entity"
            onClick={() => {
              if (isEntityDetails && index === 1) {
                this.props.showRelationList();
              } else {
                this.props.showEntityDetails(relation.entity2);
              }
            }}
            {...optionsCol2}
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
  showEntityDetails: React.PropTypes.func,
  showRelationList: React.PropTypes.func,
  isEntityDetails: React.PropTypes.bool,
  isRelationDetails: React.PropTypes.bool,
  index: React.PropTypes.number,
  goToFullRelationList: React.PropTypes.func,
};
