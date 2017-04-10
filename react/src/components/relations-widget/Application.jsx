import React from 'react';
import Papa from 'papaparse';

import Utils from '../../Utils';
import SearchField from './SearchField';
import RelationList from './RelationList';
import loadRelations from './remote/loadRelations';
import '../../../scss/relations-widget.scss';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relations: [],
      relationsFiltered: [],
      fullScreenMode: false,
      page: 1,
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
        relationsFiltered: state.relations,
      }));
    } else {
      this.setState(state => ({
        page: 1,
        relationsFiltered: state.relations.filter(relation =>
          relation.entity1.toLowerCase().includes(query) ||
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

  render() {
    const {
      relationsFiltered,
      fullScreenMode,
    } = this.state;

    return (
      <div className={`widget ${fullScreenMode ? 'widget--full-screen' : ''}`}>
        <div className="widget__control-bar row">
          <h5 className="widget__control-bar__title col-4 col-sm-3 col-md-3">
            { this.props.entity }
          </h5>
          <div className="col-12 col-sm-8 col-md-6 widget__control-bar__search-field">
            <SearchField
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
          page={this.state.page}
          handlePageChange={(page) => this.handlePageChange(page)}
          relations={ relationsFiltered }
          className="widget__body"
        />
      </div>
    );
  }
}

Application.propTypes = {
  entity: React.PropTypes.string.isRequired,
};

export default Application;
