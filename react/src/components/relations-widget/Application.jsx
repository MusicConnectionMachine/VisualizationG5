import React from 'react';
import Papa from 'papaparse';
import _ from 'lodash';

import Utils from '../../Utils';
import RelationsDataService from './remote/RelationsDataService';
import SearchField from './SearchField';
import RelationList from './RelationList';
import '../../../scss/relations-widget.scss';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullScreenMode: false,
      relations: [],
      page: 1,
      query: '',
      mainViewQuery: '',
      mainViewPage: 1,
      selectedEntity: null,
      selectedRelation: null,
      errorMode: false,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFullScreenClick = this.onFullScreenClick.bind(this);
    this.onDownloadCsvClick = this.onDownloadCsvClick.bind(this);

    this.relationDataService = new RelationsDataService();
    this.debouncedSearch = _.debounce((query) => {
      const {
        selectedEntity,
        selectedRelation,
      } = this.state;

      this.relationDataService.loadRelations({
        relation: selectedRelation,
        object: selectedEntity,
        query,
      }).then(({ relations }) => {
        this.setState(() => ({
          page: 1,
          relations,
        }));
      });
    }, 500);
  }

  componentWillMount() {
    this.loadAllRelations();
  }

  onSearchChange(query) {
    this.setState({ query });
    this.debouncedSearch(query);
  }

  onDownloadCsvClick() {
    const csv = Papa.unparse({
      fields: ['entity1', 'relation', 'entity2', 'sourceText', 'sourceLink'],
      data: this.state.relations.map(relation => [
        relation.entity1,
        relation.relation,
        relation.entity2,
        relation.sources[0].text,
        relation.sources[0].url,
      ]),
    });
    Utils.download('relations.csv', csv, 'text/csv');
  }

  onFullScreenClick() {
    this.setState(state => ({
      fullScreenMode: !state.fullScreenMode,
    }));
  }

  loadAllRelations() {
    this.relationDataService.loadRelations()
      .then(data => {
        this.setState({
          relations: data.relations,
          errorMode: false,
        });
      })
      .catch(() => this.setState({ errorMode: true }));
  }

  isDetailsView() {
    return (this.state.selectedEntity || this.state.selectedRelation);
  }

  handlePageChange(page) {
    this.setState({ page });
  }

  showRelationDetails(relation) {
    this.relationDataService.loadRelations({ relation })
      .then(({ relations }) => {
        this.setState(state => ({
          selectedRelation: relation,
          selectedEntity: null,
          page: 1,
          relations,
          query: '',
          mainViewQuery: !this.isDetailsView() ? state.query : state.mainViewQuery,
          mainViewPage: !this.isDetailsView() ? state.page : state.mainViewPage,
          errorMode: false,
        }));
      });
  }

  showEntityDetails(entity) {
    this.relationDataService.loadRelations({ object: entity })
      .then(({ relations }) => {
        this.setState(state => ({
          selectedRelation: null,
          selectedEntity: entity,
          page: 1,
          relations,
          query: '',
          mainViewQuery: !this.isDetailsView() ? state.query : state.mainViewQuery,
          mainViewPage: !this.isDetailsView() ? state.page : state.mainViewPage,
          errorMode: false,
        }));
      });
  }

  showRelationList() {
    this.setState(prevState => ({
      selectedEntity: null,
      selectedRelation: null,
      query: prevState.mainViewQuery,
      page: prevState.mainViewPage,
    }));
    this.loadAllRelations();
  }

  render() {
    const {
      relations,
      fullScreenMode,
      query,
      selectedEntity,
      selectedRelation,
      errorMode,
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
            <a href="#">
              <div
                className="widget__control-bar__button widget__control-bar__download-button"
                onClick={this.onDownloadCsvClick}
              />
            </a>
          </div>
          {errorMode && (
            <p style={{ textAlign: 'center', marginTop: '50px' }}> We're sorry. Something went wrong on our end! </p>
          )}
          {(!errorMode &&
            <RelationList
              relations={relations}
              page={this.state.page}
              query={query}
              className="widget__body"
              showRelationDetails={_relation => this.showRelationDetails(_relation)}
              showEntityDetails={_entity => this.showEntityDetails(_entity)}
              showRelationList={() => this.showRelationList()}
              handlePageChange={(page) => this.handlePageChange(page)}
              isRelationDetails={selectedRelation && !selectedEntity}
              isEntityDetails={selectedEntity && !selectedRelation}
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
