import React from 'react';
import styleFor from './Paginator.module.css';
import cn from 'classnames';

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize}) => {
    let pageCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i < pageCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = React.useState(1);
    let leftProtionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styleFor.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>
            }
            {pages
                .filter((page) => ((page >= leftProtionPageNumber) && (page <= rightPortionPageNumber)))
                .map((page) => {
                    return (
                        <span key={Math.floor(Math.random() * 1000000)}
                              className={cn({
                                  [styleFor.selectedPage]: currentPage === page
                              }, styleFor.pageNumber)}
                              onClick={(e) => {
                                  onPageChanged(page);
                              }}>{page}</span>
                    )
                })}
            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>
            }

        </div>
    )
};

export default Paginator;