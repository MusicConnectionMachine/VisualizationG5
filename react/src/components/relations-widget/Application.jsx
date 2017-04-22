import React from 'react';
import Papa from 'papaparse';

import Utils from '../../Utils';
import RelationsDataService from './remote/RelationsDataService';
import SearchField from './SearchField';
import RelationList from './RelationList';
import loadRelationEntities from './remote/loadRelationEntities';
import loadEntityRelations from './remote/loadEntityRelations';
import '../../../scss/relations-widget.scss';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullScreenMode: false,
      relations: [],
      relationsFiltered: [],
      page: 1,
      query: '',
      mainViewQuery: '',
      mainViewPage: 1,
      shouldShowEntityDetails: false,
      shouldShowRelationDetails: false,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFullScreenClick = this.onFullScreenClick.bind(this);
    this.onDownloadCsvClick = this.onDownloadCsvClick.bind(this);

    this.relationDataService = new RelationsDataService();
  }

  componentWillMount() {
    this.loadAllRelations();
  }

  onSearchChange(query) {
    if (!query) {
      this.setState(state => ({
        query,
        page: 1,
        relationsFiltered: state.relations,
      }));
    } else {
      this.setState(state => ({
        query,
        page: 1,
        relationsFiltered: state.relations.filter(relation =>
          relation.relation.toLowerCase().includes(query) ||
          relation.entity2.toLowerCase().includes(query)
        ),
      }));
    }
  }

  onDownloadCsvClick() {
    const csv = Papa.unparse({
      fields: ['entity1', 'relation', 'entity2', 'sourceText', 'sourceLink'],
      data: this.state.relationsFiltered.map(relation => [
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
    const { entity } = this.props;

    this.relationDataService.loadRelations({ entity }).then(data => {
      this.setState({
        relations: data.relations,
        relationsFiltered: data.relations,
      });
    });
  }

  isDetailsView() {
    return (this.state.shouldShowEntityDetails || this.state.shouldShowRelationDetails);
  }

  handlePageChange(page) {
    this.setState({ page });
  }

  showRelationDetails(relation) {
    loadRelationEntities(relation)
      .then(({ relations }) => {
        this.setState(state => ({
          shouldShowRelationDetails: true,
          shouldShowEntityDetails: false,
          page: 1,
          relations,
          relationsFiltered: relations,
          query: '',
          mainViewQuery: !this.isDetailsView() ? state.query : state.mainViewQuery,
          mainViewPage: !this.isDetailsView() ? state.page : state.mainViewPage,
        }));
      });
  }

  showEntityDetails(entity) {
    loadEntityRelations(entity)
      .then(({ relations }) => {
        this.setState(state => ({
          shouldShowRelationDetails: false,
          shouldShowEntityDetails: true,
          page: 1,
          relations,
          relationsFiltered: relations,
          query: '',
          mainViewQuery: !this.isDetailsView() ? state.query : state.mainViewQuery,
          mainViewPage: !this.isDetailsView() ? state.page : state.mainViewPage,
        }));
      });
  }

  showRelationList() {
    this.setState(prevState => ({
      shouldShowEntityDetails: false,
      shouldShowRelationDetails: false,
      query: prevState.mainViewQuery,
      page: prevState.mainViewPage,
    }));
    this.loadAllRelations();
  }

  render() {
    const {
      relationsFiltered,
      fullScreenMode,
      query,
      entity,
      shouldShowEntityDetails,
      shouldShowRelationDetails,
    } = this.state;

    return (
      <div className={`widget ${fullScreenMode ? 'widget--full-screen' : ''}`}>
        <div className="widget__control-bar row">
          <h5 className="widget__control-bar__title col-4 col-sm-3 col-md-3">
            { entity }
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
        <RelationList
          relations={relationsFiltered}
          page={this.state.page}
          query={query}
          className="widget__body"

          showRelationDetails={_relation => this.showRelationDetails(_relation)}
          showEntityDetails={_entity => this.showEntityDetails(_entity)}
          showRelationList={() => this.showRelationList()}
          handlePageChange={(page) => this.handlePageChange(page)}
          isRelationDetails={shouldShowRelationDetails && !shouldShowEntityDetails}
          isEntityDetails={shouldShowEntityDetails && !shouldShowRelationDetails}
        />
      </div>
    );
  }
}

Application.propTypes = {
  entity: React.PropTypes.string.isRequired,
};

export default Application;
