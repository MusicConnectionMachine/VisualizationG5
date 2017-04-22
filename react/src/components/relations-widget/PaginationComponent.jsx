import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export default class PaginationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      currentPage,
      itemCount,
      handlePageChange,
      maxPages,
      itemsPerPage,
    } = this.props;

    const numberPages = Math.min(maxPages, Math.ceil(itemCount / itemsPerPage));

    return (
      <Pagination
        id="relation-popover-target"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        {new Array(numberPages).fill(undefined).map((____, index) =>
          <PaginationItem key={index}>
            <PaginationLink
              style={ index + 1 === currentPage ?
                {
                  backgroundColor: '#DDDDDD',
                  fontColor: '#004d90'
                } : {}}
              href="#"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        )}
      </Pagination>
    );
  }
}

PaginationComponent.propTypes = {
  currentPage: React.PropTypes.number,
  itemCount: React.PropTypes.number,
  handlePageChange: React.PropTypes.func,
  maxPages: React.PropTypes.number,
  itemsPerPage: React.PropTypes.number,
};
