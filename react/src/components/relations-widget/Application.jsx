import React from 'react';
import Papa from 'papaparse';

import Utils from '../../Utils';
import SearchField from './SearchField';
import RelationList from './RelationList';
import RelationDetails from './RelationDetails';
import loadRelations from './remote/loadRelations';
import loadRelationEntities from './remote/loadRelationEntities';
import '../../../scss/relations-widget.scss';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relations: [],
      relationsFiltered: [],
      fullScreenMode: false,
      showRelationDetails: false,
      page: 1,
      relation: null,
      relationEntities: [],
      relationEntitiesFiltered: [],
      relationEntitiesPage: 1,
      query: '',
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
        relationsFiltered: state.relations,
        relationEntitiesFiltered: state.relationEntities,
      }));
    } else {
      if (this.state.relation) {
        this.setState(state => ({
          query,
          page: 1,
          relationEntitiesPage: 1,
          relationEntitiesFiltered: state.relationEntities.filter(entity => {
            return entity.entity2.toLowerCase().includes(query);
          }),
        }));
      } else {
        this.setState(state => ({
          query,
          page: 1,
          relationEntitiesPage: 1,
          relationsFiltered: state.relations.filter(relation =>
            relation.entity1.toLowerCase().includes(query) ||
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

  // TODO: Not working as expected
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

  showRelationDetails(relation) {
    this.setState({ relation });
    loadRelationEntities(relation)
      .then(({ relationEntities }) => this.setState({ relationEntities, relationEntitiesFiltered: relationEntities, query: '' }));
  }

  showRelationList() {
    this.setState({ relation: null, query: '' });
  }

  render() {
    const {
      relationsFiltered,
      fullScreenMode,
      relation,
      relationEntitiesPage,
      relationEntitiesFiltered,
      query,
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
          {!relation &&
            <a href="#">
              <div
                className="widget__control-bar__button widget__control-bar__download-button"
                onClick={this.onDownloadCsvClick}
              />
            </a>
          }
        </div>
        {!relation && (
          <RelationList
            page={this.state.page}
            showRelationDetails={_relation => this.showRelationDetails(_relation)}
            handlePageChange={(page) => this.handlePageChange(page)}
            relations={ relationsFiltered }
            className="widget__body"
          />
        )}
        {relation && (
          <RelationDetails
            relation={relation}
            relationEntitiesPage={relationEntitiesPage}
            handleRelationEntitiesPage={page => this.handleRelationEntitiesPage(page)}
            relationEntities={relationEntitiesFiltered}
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
