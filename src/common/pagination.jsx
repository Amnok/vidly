/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default function Pagination({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? 'page-item active' : 'page-item'
              }
              onClick={() => onPageChange(page)}
            >
              <a className="page-link" href="#">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
