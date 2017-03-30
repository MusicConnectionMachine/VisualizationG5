import _ from 'lodash';
import React from 'react';
import { Progress, Pagination, PaginationLink, PaginationItem } from 'reactstrap';

import Relation from './Relation';
import RelationSuggestion from './RelationSuggestion';


const LIMIT = 5;
const MAX_PAGES = 5;

class RelationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
  }

  render() {
    const {
      relations,
      showSuggestions,
      relationsSuggestions,
      loadingSuggestions,
      onRelationSuggestionClick,
      loadingRelations,
    } = this.props;

    const { page } = this.state;

    const numberPages = Math.min(MAX_PAGES, Math.ceil(relations.length / LIMIT));
    const displayRelations = relations.slice((page - 1) * LIMIT, page * LIMIT);
    const displayRelationsSuggestions = relationsSuggestions.slice(0, LIMIT);

    return (
      <div>
        {!!showSuggestions && (
          <div className="relation-list__suggestions">
            <h6 className="relation-list__suggestions__title"> Suggestions... </h6>
            {!loadingSuggestions && (
              <div className="relation-list__suggestions__suggestion-list">
                {_.map(displayRelationsSuggestions, relationSuggestion =>
                  <RelationSuggestion
                    key={`${relationSuggestion.title}`}
                    className="relation-list__suggestions__suggestion-list__item"
                    relationSuggestion={relationSuggestion}
                    onRelationSuggestionClick={onRelationSuggestionClick}
                  />
                )}
              </div>
            )}
            {!!loadingSuggestions && (
              <Progress value={60} />
            )}
          </div>
        )}

        {!showSuggestions && (
          <div>
            {!loadingRelations && (
              <div className="relation-list__relation-list">
                {_.map(displayRelations, relation =>
                  <Relation
                    key={`${relation.title}`}
                    className="relation-list__relation-list__item"
                    relation={relation}
                  />
                )}
                <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
                  {new Array(numberPages).fill(undefined).map((____, index) =>
                    <PaginationItem key={index}>
                      <PaginationLink href="#" onClick={() => this.setState({ page: index + 1 })}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                </Pagination>
              </div>
            )}
            {!!loadingRelations && (
              <Progress value={55}> Loading ... </Progress>
            )}
          </div>
        )}
      </div>
    );
  }
}

RelationList.propTypes = {
  relations: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string,
  })).isRequired,
  relationsSuggestions: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string,
  })).isRequired,
  onRelationSuggestionClick: React.PropTypes.func.isRequired,
  showSuggestions: React.PropTypes.bool.isRequired,
  loadingSuggestions: React.PropTypes.bool.isRequired,
  loadingRelations: React.PropTypes.bool.isRequired,
};

export default RelationList;
