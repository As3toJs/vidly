import React from 'react';
import { range } from 'ramda';

const Pagination = ({ pageLimit, currentPage, total, onSelectePage }) => {
    const pages = Math.ceil(total / pageLimit);
    if (pages === 1) return null;
    const pageRange = range(1, (pages + 1));
    return (
        <nav>
            <ul className="pagination">
                {pageRange.map(page => {
                    return (
                        <li key={page} className={currentPage === page ? "page-item active" : "page-item"}>
                            <a
                                className="page-link"
                                onClick={() => onSelectePage(page)}>
                                {page}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination;