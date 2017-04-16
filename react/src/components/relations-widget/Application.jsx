import React from 'react';
import Papa from 'papaparse';

import Utils from '../../Utils';
import SearchField from './SearchField';
import RelationList from './RelationList';
import RelationDetails from './RelationDetails';
import EntityDetails from './EntityDetails';
import loadRelations from './remote/loadRelations';
import loadRelationEntities from './remote/loadRelationEntities';
import loadEntityRelations from './remote/loadEntityRelations';
import '../../../scss/relations-widget.scss';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relations: [],
      relationsFiltered: [],
      fullScreenMode: false,
      showRelationDetails: false,
      showEntity2Details: false,
      page: 1,
      entity: null,
      entity2: null,
      entity2Relations: [],
      entity2RelationsFiltered: [],
      entity2RelationsPage: 1,
      relation: null,
      relationEntities: [],
      relationEntitiesFiltered: [],
      relationEntitiesPage: 1,
      query: '',
      mainViewQuery: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFullScreenClick = this.onFullScreenClick.bind(this);
    this.onDownloadCsvClick = this.onDownloadCsvClick.bind(this);
  }

  componentWillMount() {
    const { entity } = this.props;
    loadRelations(entity).then(data => {
      this.setState({
        relations: data.relations,
        relationsFiltered: data.relations,
      });
    });
  }

  onSearchChange(query) {
    if (!query) {
      this.setState(state => ({
        query,
        relationEntitiesPage: 1,
        entity2RelationsPage: 1,
        page: 1,
        relationsFiltered: state.relations,
        relationEntitiesFiltered: state.relationEntities,
        entity2RelationsFiltered: state.entity2Relations,
      }));
    } else {
      this.setState({
        query,
      });

      if (this.state.relation) {
        this.setState(state => ({
          relationEntitiesPage: 1,
          relationEntitiesFiltered: state.relationEntities.filter(entity => {
            return entity.entity2.toLowerCase().includes(query);
          }),
        }));
      } else if (this.state.entity2) {
        this.setState(state => ({
          entity2RelationsPage: 1,
          entity2RelationsFiltered: state.entity2Relations.filter(relation => {
            return relation.relation.toLowerCase().includes(query);
          }),
        }));
      } else {
        this.setState(state => ({
          page: 1,
          mainViewQuery: query,
          relationsFiltered: state.relations.filter(relation =>
            relation.relation.toLowerCase().includes(query) ||
            relation.entity2.toLowerCase().includes(query)
          ),
        }));
      }
    }
  }

  onDownloadCsvClick() {
    const csv = Papa.unparse({
      fields: ['entity1', 'relation', 'entity2', 'sourceText', 'sourceLink'],
      data: this.state.relationsFiltered.map(relation => [
        relation.entity1,
        relation.relation,
        relation.entity2,
        relation.source.text,
        relation.source.url,
      ]),
    });
    Utils.download('relations.csv', csv, 'text/csv');
  }

  onFullScreenClick() {
    this.setState(state => ({
      fullScreenMode: !state.fullScreenMode,
    }));
  }

  handlePageChange(page) {
    this.setState({ page });
  }

  handleRelationEntitiesPage(relationEntitiesPage) {
    this.setState({ relationEntitiesPage });
  }

  handleEntityRelationsPage(entity2RelationsPage) {
    this.setState({ entity2RelationsPage });
  }

  showRelationDetails(relation) {
    this.setState({ relation });
    loadRelationEntities(relation)
      .then(({ relationEntities }) => this.setState({ relationEntitiesPage: 1, relationEntities, relationEntitiesFiltered: relationEntities, query: '' }));
  }

  showEntity2Details(entity) {
    this.setState({ entity2: entity });
    loadEntityRelations(entity)
      .then(({ entity2Relations }) => this.setState({ entity2RelationsPage: 1, entity2Relations, entity2RelationsFiltered: entity2Relations, query: '' }));
  }

  showRelationList() {
    this.setState(prevState => ({ entity2: null, relation: null, query: prevState.mainViewQuery }));
  }

  render() {
    const {
      relationsFiltered,
      fullScreenMode,
      relation,
      relationEntitiesPage,
      relationEntitiesFiltered,
      query,
      entity,
      entity2,
      entity2RelationsPage,
      entity2RelationsFiltered,
    } = this.state;

    return (
      <div className={`widget ${fullScreenMode ? 'widget--full-screen' : ''}`}>
        <div className="widget__control-bar row">
          <h5 className="widget__control-bar__title col-4 col-sm-3 col-md-3">
            { this.props.entity }
          </h5>
          <div className="col-12 col-sm-8 col-md-6 widget__control-bar__search-field">
            <SearchField
              query={query}
              className="relation-widget__search__field"
              handleSearchChange={this.onSearchChange}
            />
          </div>
          <a href="#">
            <div
              className="widget__control-bar__button widget__control-bar__full-button"
              onClick={this.onFullScreenClick}
            />
          </a>
          {!relation && !entity && (
            <a href="#">
              <div
                className="widget__control-bar__button widget__control-bar__download-button"
                onClick={this.onDownloadCsvClick}
              />
            </a>
          )}
        </div>
        {!relation && !entity2 && (
          <RelationList
            page={this.state.page}
            query={query}
            showRelationDetails={_relation => this.showRelationDetails(_relation)}
            showEntity2Details={_entity => this.showEntity2Details(_entity)}
            handlePageChange={(page) => this.handlePageChange(page)}
            relations={ relationsFiltered }
            className="widget__body"
          />
        )}
        {relation && !entity2 && (
          <RelationDetails
            relation={relation}
            query={query}
            relationEntitiesPage={relationEntitiesPage}
            handleRelationEntitiesPage={page => this.handleRelationEntitiesPage(page)}
            relationEntities={relationEntitiesFiltered}
            showRelationList={() => this.showRelationList()}
          />
        )}
        {entity2 && !relation && (
          <EntityDetails
            entity2={entity2}
            query={query}
            entity2RelationsPage={entity2RelationsPage}
            handleEntityRelationsPage={page => this.handleEntityRelationsPage(page)}
            entity2Relations={entity2RelationsFiltered}
            showRelationList={() => this.showRelationList()}
          />
        )}
      </div>
    );
  }
}

Application.propTypes = {
  entity: React.PropTypes.string.isRequired,
};

export default Application;
