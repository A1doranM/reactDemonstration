import React from 'react';
import styleFor from './Paginator.module.css';

let Paginator = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i < pageCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map((page) => {
                return (
                    <span key={Math.floor(Math.random() * 1000000)}
                          className={(props.currentPage === page && styleFor.selectedPage).toString()}
                          onClick={(e) => {
                              props.onPageChanged(page);
                          }}>{page}</span>
                )
            })}

        </div>
    )
};

export default Paginator;