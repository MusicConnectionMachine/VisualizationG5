import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationFooter = (props) => {
  const {
    currentPage,
    lastPage,
    handlePageClick,
    className,
  } = props;

  return (
    <div className={`pagination-footer ${className}`}>
      <Pagination>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href="#/" onClick={() => handlePageClick(1)}>
              {1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <span className="pagination-footer__separator">...</span>
        )}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href="#/" onClick={() => handlePageClick(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#/" onClick={() => handlePageClick(currentPage)}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < lastPage && (
          <PaginationItem>
            <PaginationLink href="#/" onClick={() => handlePageClick(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage + 2 < lastPage && (
          <span className="pagination-footer__separator">...</span>
        )}
        {currentPage + 1 < lastPage && (
          <PaginationItem>
            <PaginationLink href="#/" onClick={() => handlePageClick(lastPage)}> {lastPage} </PaginationLink>
          </PaginationItem>
        )}
      </Pagination>
    </div>
  );
};

PaginationFooter.propTypes = {
  className: React.PropTypes.string,
  currentPage: React.PropTypes.number.isRequired,
  lastPage: React.PropTypes.number.isRequired,
  handlePageClick: React.PropTypes.func.isRequired,
};

export default PaginationFooter;
