import React from 'react';

class PaginationFooter extends React.Component {
  render() {
    const {
      currentPage,
      lastPage,
      className,
      handlePageClick,
    } = this.props;


    const createClassName = (buttonPage) => {
      return 'pagination-footer__button pagination-footer__button' + (currentPage === buttonPage ? '--selected' : '');
    };

    return (
      <div className={`pagination-footer ${className}`}>
        <div>
          {currentPage > 1 && (
            <span className={createClassName(1)} onClick={() => handlePageClick(1)}>
              {1}
            </span>
          )}
          {currentPage > 3 && (
            <span className="pagination-footer__separator">...</span>
          )}
          {currentPage > 2 && (
            <span className={createClassName(currentPage - 1)} onClick={() => handlePageClick(currentPage - 1)}>
              {currentPage - 1}
            </span>
          )}
          <span className={createClassName(currentPage)} onClick={() => handlePageClick(currentPage)}>
            {currentPage}
          </span>
          {currentPage < lastPage && (
            <span className={createClassName(currentPage + 1)} onClick={() => handlePageClick(currentPage + 1)}>
              {currentPage + 1}
            </span>
          )}
          {currentPage + 2 < lastPage && (
            <span className="pagination-footer__separator">...</span>
          )}
          {currentPage + 1 < lastPage && (
            <span className={createClassName(lastPage)} onClick={() => handlePageClick(lastPage)}>
              {lastPage}
            </span>
          )}
        </div>
      </div>
    );
  }
}

PaginationFooter.propTypes = {
  className: React.PropTypes.string,
  currentPage: React.PropTypes.number.isRequired,
  lastPage: React.PropTypes.number.isRequired,
  handlePageClick: React.PropTypes.func.isRequired,
};

export default PaginationFooter;
