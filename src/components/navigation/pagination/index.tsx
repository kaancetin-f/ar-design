"use client";

import React, { useContext, useEffect, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/navigation/pagination/pagination.css";
import { ConfigContext } from "../../../libs/core/application/contexts/Config";

const Pagination: React.FC<IProps> = ({ defaultCurrent = 1, currentPage, totalRecords, perPage, onChange }) => {
  // context
  const { config } = useContext(ConfigContext);

  // states
  const [pages, setPages] = useState<React.JSX.Element[]>([]);
  const [_currentPage, setCurrentPage] = useState<number>(defaultCurrent);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  // useEffect
  useEffect(() => {
    if (totalRecords === 0) return;

    const liItems = [];
    const _totalPageCount = Math.ceil(totalRecords / (perPage ?? config.perPage));
    setTotalPageCount(_totalPageCount);

    // Başlangıç ve bitiş aralığını hesapla.
    const startPage = Math.max(1, _currentPage - 1);
    const endPage = Math.min(_totalPageCount, _currentPage + 1);

    // İlk sayfa ve ... eklemek.
    if (startPage > 1) {
      liItems.push(
        <li key={1} onClick={() => setCurrentPage(1)}>
          1
        </li>
      );

      if (startPage > 2) {
        liItems.push(
          <li key="start-ellipsis" className="start-ellipsis">
            ...
          </li>
        );
      }
    }

    // Sayfa aralığını eklemek.
    for (let i = startPage; i <= endPage; i++) {
      liItems.push(
        <li key={i} className={i === _currentPage ? "selection-page" : ""} onClick={() => setCurrentPage(i)}>
          {i}
        </li>
      );
    }

    // Son sayfa ve ... eklemek.
    if (endPage < _totalPageCount) {
      if (endPage < _totalPageCount - 1) {
        liItems.push(
          <li key="end-ellipsis" className="end-ellipsis">
            ...
          </li>
        );
      }

      liItems.push(
        <li key={_totalPageCount} onClick={() => setCurrentPage(_totalPageCount)}>
          {_totalPageCount}
        </li>
      );
    }

    setPages(liItems);
    onChange(_currentPage);
  }, [totalRecords, _currentPage]);

  useEffect(() => setCurrentPage(currentPage), [currentPage]);

  return (
    <div className="ar-pagination">
      <ul>
        <li
          className={_currentPage === 1 ? "passive" : ""}
          onClick={() => {
            if (_currentPage === 1) return;

            setCurrentPage(1);
          }}
        >
          <span>{"«"}</span>
        </li>
        <li
          className={_currentPage === 1 ? "passive" : ""}
          onClick={() => {
            if (_currentPage === 1) return;

            setCurrentPage((prev) => {
              if (prev === 1) return prev;
              return (prev -= 1);
            });
          }}
        >
          <span>{"‹"}</span>
        </li>

        {pages}

        <li
          className={totalPageCount === _currentPage ? "passive" : ""}
          onClick={() => {
            if (totalPageCount === _currentPage) return;

            setCurrentPage((prev) => {
              if (prev === totalPageCount) return prev;
              return (prev += 1);
            });
          }}
        >
          <span>{"›"}</span>
        </li>
        <li
          className={totalPageCount === _currentPage ? "passive" : ""}
          onClick={() => {
            if (totalPageCount === _currentPage) return;

            setCurrentPage(totalPageCount);
          }}
        >
          <span>{"»"}</span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
