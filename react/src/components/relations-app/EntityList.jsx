import _ from 'lodash';
import React from 'react';
import { Progress, Pagination, PaginationLink, PaginationItem } from 'reactstrap';

import Entity from './Entity';
import EntitySuggestion from './EntitySuggestion';


const LIMIT = 5;
const MAX_PAGES = 5;

class EntityList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
  }

  render() {
    const {
      entities,
      showSuggestions,
      entitiesSuggestions,
      loadingSuggestions,
      onEntitySuggestionClick,
      loadingEntities,
    } = this.props;

    const { page } = this.state;

    const numberPages = Math.min(MAX_PAGES, Math.ceil(entities.length / LIMIT));
    const displayEntitiesSuggestions = entitiesSuggestions.slice(0, LIMIT);
    const displayEntities = entities.slice((page - 1) * LIMIT, page * LIMIT);

    return (
      <div>
        {!!showSuggestions && (
          <div className="entity-list__suggestions">
            <h6 className="entity-list__suggestions__title"> Suggestions... </h6>
            {!loadingSuggestions && (
              <div className="entity-list__suggestions__suggestion-list">
                {_.map(displayEntitiesSuggestions, entitySuggestion =>
                  <EntitySuggestion
                    key={`${entitySuggestion.title}.${entitySuggestion.type}`}
                    className="entity-list__suggestions__suggestion-list__item"
                    entitySuggestion={entitySuggestion}
                    onEntitySuggestionClick={onEntitySuggestionClick}
                  />
                )}
              </div>
            )}
            {!!loadingSuggestions && (
              <Progress value={75} />
            )}
          </div>
        )}

        {!showSuggestions && (
          <div>
            {!loadingEntities && (
              <div className="entity-list__entity-list">
                {_.map(displayEntities, entity =>
                  <Entity
                    key={`${entity.title}.${entity.type}`}
                    className="entity-list__entity-list__item"
                    entity={entity}
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
            {!!loadingEntities && (
              <Progress value={55}> Loading ... </Progress>
            )}
          </div>
        )}
      </div>
    );
  }
}

EntityList.propTypes = {
  entities: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string,
    type: React.PropTypes.string,
  })).isRequired,
  entitiesSuggestions: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string,
    type: React.PropTypes.string,
  })).isRequired,
  onEntitySuggestionClick: React.PropTypes.func.isRequired,
  showSuggestions: React.PropTypes.bool.isRequired,
  loadingSuggestions: React.PropTypes.bool.isRequired,
  loadingEntities: React.PropTypes.bool.isRequired,
};

export default EntityList;
