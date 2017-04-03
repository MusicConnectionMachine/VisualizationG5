import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Entity from './Entity';
import EntityList from './EntityList';
import Relation from './Relation';
import RelationList from './RelationList';
import SearchField from './SearchField';
import loadSuggestions from './remote/loadSuggestions';
import loadRelations from './remote/loadRelations';
import loadEntities from './remote/loadEntities';
import '../../../scss/relations-app.scss';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entity: {
        title: 'Mozart',
        type: 'composer',
      },
      relationSuggestion: null,
      entitySuggestion: null,
      query: '',
      entities: [],
      relations: [],
      entitiesSuggestions: [],
      relationsSuggestions: [],
      showSuggestions: false,
      loadingSuggestions: false,
      loadingEntities: false,
      loadingRelations: false,
    };
  }

  onSearchChange(query) {
    this.setState({
      query,
      showSuggestions: true,
      loadingSuggestions: true,
      loadingEntities: false,
      loadingRelations: false,
      relationSuggestion: null,
      entitySuggestion: null,
      entities: [],
      relations: [],
    });

    loadSuggestions(query).then(suggestions => {
      this.setState({
        ...suggestions,
        loadingSuggestions: false,
      });
    });
  }

  onEntitySuggestionClick(entitySuggestion) {
    this.setState({
      showSuggestions: false,
      loadingRelations: true,
      entitySuggestion,
    });

    loadRelations(entitySuggestion).then(result => {
      this.setState({
        ...result,
        loadingRelations: false,
      });
    });
  }

  onRelationSuggestionClick(relationSuggestion) {
    this.setState({
      showSuggestions: false,
      loadingEntities: true,
      relationSuggestion,
    });

    loadEntities(relationSuggestion).then(result => {
      this.setState({
        ...result,
        loadingEntities: false,
      });
    });
  }

  render() {
    const {
      query,
      entity,
      entities,
      relations,
      entitiesSuggestions,
      relationsSuggestions,
      showSuggestions,
      loadingSuggestions,
      loadingEntities,
      loadingRelations,
      relationSuggestion,
      entitySuggestion,
    } = this.state;

    return (
      <Container className="application">
        <Row>
          <Col>
            <SearchField
              query={query}
              className="application__search__field"
              handleSearchChange={(_query) => this.onSearchChange(_query)}
              handleSearchClick={() => 3}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={!!query ? '4' : '12'} xs="12">
            <Entity
              entity={entity}
            />
          </Col>
          {!!query && (
            <Col sm="4" xs="6">
              {!!relationSuggestion && (
                <Relation
                  relation={relationSuggestion}
                />
              )}
              {!relationSuggestion && (
                <RelationList
                  relations={relations}
                  relationsSuggestions={relationsSuggestions}
                  showSuggestions={showSuggestions}
                  loadingSuggestions={loadingSuggestions}
                  loadingRelations={loadingRelations}
                  onRelationSuggestionClick={(_relationSuggestion) => this.onRelationSuggestionClick(_relationSuggestion)}
                />
              )}
            </Col>
          )}
          {!!query && (
            <Col sm="4" xs="6">
              {!!entitySuggestion && (
                <Entity
                  entity={entitySuggestion}
                />
              )}
              {!entitySuggestion && (
                <EntityList
                  entities={entities}
                  entitiesSuggestions={entitiesSuggestions}
                  showSuggestions={showSuggestions}
                  loadingSuggestions={loadingSuggestions}
                  loadingEntities={loadingEntities}
                  onEntitySuggestionClick={(_entitySuggestion) => this.onEntitySuggestionClick(_entitySuggestion)}
                />
              )}
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default Application;
