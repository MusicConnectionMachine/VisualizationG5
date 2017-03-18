import React from 'react';
import Pagination from 'visualizationG5/components/pagination/pagination';

import Composer from './Composer';
import Suggestion from './Suggestion';
import loadComposers from './utils/loadComposers';
import loadSuggestions from './utils/loadSuggestions';
import '../../../scss/composers-app.scss';


class Composers extends React.Component {
  constructor(props) {
    super(props);

    this.limit = 15;
    this.state = {
      composers: [],
      composersTotalCount: 0,
      suggestions: [],
      currentPage: 1,
      showSuggestions: false,
      query: '',
    };
  }

  componentWillMount() {
    loadComposers().then(result => {
      const { composers, composersTotalCount } = result;
      this.setState({ composers, composersTotalCount, currentPage: 1 });
    });
  }

  onPageClick(page) {
    const { query } = this.state;
    loadComposers(page, { query, limit: this.limit }).then(result => {
      const { composers, composersTotalCount } = result;
      this.setState({ composers, composersTotalCount, currentPage: page });
    });
  }

  onSearchChange(suggestion) {
    loadSuggestions(suggestion).then(result => {
      const { suggestions } = result;
      this.setState({ suggestions, query: suggestion, showSuggestions: true });
    });
  }

  onSuggestionClick(suggestion) {
    const currentPage = 1;
    loadComposers(currentPage, { query: suggestion, limit: this.limit }).then(result => {
      const { composers, composersTotalCount } = result;
      this.setState({ composers, composersTotalCount, currentPage, showSuggestions: false, query: suggestion });
    });
  }

  onSearchClick() {
    const currentPage = 1;
    const { query } = this.state;
    loadComposers(currentPage, { query, limit: this.limit }).then(result => {
      const { composers, composersTotalCount } = result;
      this.setState({ composers, composersTotalCount, currentPage, showSuggestions: false });
    });
  }

  render() {
    const {
      composers,
      currentPage,
      composersTotalCount,
      suggestions,
      showSuggestions,
    } = this.state;

    return (
      <div>
        <Pagination
          EntityComponent={Composer}
          SuggestionComponent={Suggestion}
          title="Composers"
          entities={composers}
          showSuggestions={showSuggestions}
          suggestions={suggestions}
          currentPage={currentPage}
          limit={this.limit}
          offset={0}
          entitiesTotalCount={composersTotalCount}
          handleSearchChange={query => this.onSearchChange(query)}
          handleSearchClick={() => this.onSearchClick()}
          handlePageClick={page => this.onPageClick(page)}
          handleSuggestionClick={suggestion => this.onSuggestionClick(suggestion)}
        />
      </div>
  );
  }
}

export default Composers;
