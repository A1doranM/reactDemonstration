import React from "react";
import styleFor from "./Paginator.module.css";
import cn from "classnames";

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize: number
}

let Paginator: React.FC<PropsType> = ({
                                          totalItemsCount,
                                          pageSize,
                                          currentPage,
                                          onPageChanged,
                                          portionSize = 10
                                      }) => {
    let [portionNumber, setPortionNumber] = React.useState<number>(1);

    let pageCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i < pageCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pageCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styleFor.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>
            }
            {pages
                .filter((page) => ((page >= leftPortionPageNumber) && (page <= rightPortionPageNumber)))
                .map((page) => {
                    return (
                        <span key={Math.floor(Math.random() * 1000000)}
                              className={cn({
                                  [styleFor.selectedPage]: currentPage === page
                              }, styleFor.pageNumber)}
                              onClick={() => {
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