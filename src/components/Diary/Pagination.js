import React, { useState } from "react";
import '../../css/Diary/Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  let pageNumber = [];
  const paginationNumPerPage = 5;
  const pageNums = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1 + (paginationNumPerPage * Math.floor(currentPage / paginationNumPerPage)); i <= pageNums; i++) {
    if (i > 5 + (paginationNumPerPage * Math.floor(currentPage / paginationNumPerPage))) { break; }
    pageNumber.push(i);
  }

  return (
    <div className="pagination">
      <div>
        <span onClick={() => { if (currentPage > 1) { paginate(currentPage - 1); } }}>&lt;</span>
        {pageNumber.map((pageNum) => (
          <span
            key={pageNum}
            className="pagination_item"
            style={ currentPage !== pageNum ? { color: 'gray' } : { color: 'black' }}
            onClick={() => { paginate(pageNum); }}
          >
            {pageNum}
          </span>
        ))}
        <span onClick={() => { if (currentPage < pageNums) { paginate(currentPage + 1); } }}>&gt;</span>
      </div>
    </div>
  );
};

export default Pagination;