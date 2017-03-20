import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import PaginationContent from 'visualizationG5/components/pagination/PaginationContent';
import PaginationFooter from 'visualizationG5/components/pagination/PaginationFooter';
import PaginationHeader from 'visualizationG5/components/pagination/PaginationHeader';
import PaginationSearch from 'visualizationG5/components/pagination/PaginationSearch';
import PaginationSuggestions from 'visualizationG5/components/pagination/PaginationSuggestions';


const Pagination = (props) => {
  const {
    EntityComponent,
    SuggestionComponent,
    currentPage,
    entities,
    entitiesTotalCount,
    handlePageClick,
    handleSearchChange,
    handleSearchClick,
    handleSuggestionClick,
    limit,
    offset,
    showSuggestions,
    suggestions,
    title,
    query,
    loading,
  } = props;

  const lastPage = Math.ceil(entitiesTotalCount / limit);
  const relevantEntities = entities.slice(offset, offset + limit);

  return (
    <div className="pagination">
      <Container>
        <Row>
          <Col>
            <PaginationHeader
              className="pagination__header"
              title={title}
            />
            <PaginationSearch
              className="pagination__search"
              query={query}
              handleSearchChange={handleSearchChange}
              handleSearchClick={handleSearchClick}
            />
            {showSuggestions && (
              <PaginationSuggestions
                className="pagination__suggestions"
                suggestions={suggestions}
                loading={loading}
                SuggestionComponent={SuggestionComponent}
                handleSuggestionClick={handleSuggestionClick}
              />
            )}
            {!showSuggestions && (
              <div>
                <PaginationContent
                  className="pagination__content"
                  loading={loading}
                  entities={relevantEntities}
                  EntityComponent={EntityComponent}
                />
                <PaginationFooter
                  className="pagination__footer"
                  handlePageClick={handlePageClick}
                  currentPage={currentPage}
                  lastPage={lastPage}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Pagination.propTypes = {
  EntityComponent: React.PropTypes.func.isRequired,
  SuggestionComponent: React.PropTypes.func.isRequired,
  handleSearchChange: React.PropTypes.func.isRequired,
  handlePageClick: React.PropTypes.func.isRequired,
  handleSuggestionClick: React.PropTypes.func.isRequired,
  handleSearchClick: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  showSuggestions: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  entitiesTotalCount: React.PropTypes.number.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  limit: React.PropTypes.number.isRequired,
  offset: React.PropTypes.number.isRequired,
  query: React.PropTypes.string.isRequired,
  entities: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
  })).isRequired,
  suggestions: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default Pagination;
