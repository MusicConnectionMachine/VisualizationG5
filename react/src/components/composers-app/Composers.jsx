import React from 'react';
import Pagination from 'visualizationG5/components/pagination/Pagination';

import Composer from './Composer';
import Suggestion from './Suggestion';
import loadComposers from './utils/loadComposers';
import loadSuggestions from './utils/loadSuggestions';
import '../../../scss/composers-app.scss';


class Composers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      composers: [],
      composersTotalCount: 0,
      suggestions: [],
      currentPage: 1,
      showSuggestions: false,
      limit: 10,
      query: '',
      loading: false,
    };
  }

  componentWillMount() {
    this.onSearchClick();
  }

  onPageClick(page) {
    this.onSearchClick(page);
  }

  onSearchChange(query) {
    if (query === '') {
      return this.setState({ query }, () => this.onSearchClick());
    }

    this.setState({ query, showSuggestions: true, loading: true });
    loadSuggestions(query).then(result => {
      const { suggestions } = result;
      this.setState({
        suggestions,
        loading: false,
      });
    });
  }

  onSuggestionClick(suggestion) {
    const currentPage = 1;
    const { limit } = this.state;
    this.setState({ showSuggestions: false, loading: true, query: suggestion });

    loadComposers(currentPage, { limit, query: suggestion }).then(result => {
      const { composers, composersTotalCount } = result;
      this.setState({
        composers,
        composersTotalCount,
        currentPage,
        loading: false,
      });
    });
  }

  onSearchClick(currentPage = 1) {
    const { query, limit } = this.state;
    this.setState({ showSuggestions: false, loading: true, currentPage });

    loadComposers(currentPage, { query, limit }).then(result => {
      const { composers, composersTotalCount } = result;
      this.setState({
        composers,
        composersTotalCount,
        loading: false,
      });
    });
  }

  render() {
    const {
      composers,
      currentPage,
      composersTotalCount,
      suggestions,
      showSuggestions,
      query,
      limit,
      loading,
    } = this.state;

    return (
      <div>
        <Pagination
          EntityComponent={Composer}
          SuggestionComponent={Suggestion}
          title="Composers"
          entities={composers}
          query={query}
          showSuggestions={showSuggestions}
          suggestions={suggestions}
          currentPage={currentPage}
          limit={limit}
          loading={loading}
          offset={0}
          entitiesTotalCount={composersTotalCount}
          handleSearchChange={_query => this.onSearchChange(_query)}
          handleSearchClick={() => this.onSearchClick()}
          handlePageClick={page => this.onPageClick(page)}
          handleSuggestionClick={suggestion => this.onSuggestionClick(suggestion)}
        />
      </div>
  );
  }
}

export default Composers;
