"use client";

import React, { useContext, useEffect, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/navigation/pagination/pagination.css";
import { ConfigContext } from "../../../libs/core/application/contexts/Config";

const Pagination: React.FC<IProps> = ({ currentPage, totalRecords, perPage, onChange }) => {
  // context
  const { config } = useContext(ConfigContext);

  // states
  const [pages, setPages] = useState<React.JSX.Element[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  // methods
  const handlePageChange = (page: number) => onChange(page);

  // useEffects
  useEffect(() => {
    if (totalRecords === 0) return;

    const liItems = [];
    const _totalPageCount = Math.ceil(totalRecords / (perPage ?? config.perPage));
    setTotalPageCount(_totalPageCount);

    // currentPage prop'unu kullanın
    const activePage = currentPage || 1;

    // Başlangıç ve bitiş aralığını hesapla.
    const startPage = Math.max(1, activePage - 1);
    const endPage = Math.min(_totalPageCount, activePage + 1);

    // Sayfalama mantığı...
    for (let i = startPage; i <= endPage; i++) {
      liItems.push(
        <li key={i} className={i === activePage ? "selection-page" : ""} onClick={() => handlePageChange(i)}>
          {i}
        </li>
      );
    }

    setPages(liItems);
  }, [totalRecords, currentPage, perPage, config.perPage]);

  return (
    <div className="ar-pagination">
      <ul>
        <li
          className={currentPage === 1 ? "passive" : ""}
          onClick={() => {
            if (currentPage === 1) return;
            handlePageChange(1);
          }}
        >
          <span>{"«"}</span>
        </li>
        <li
          className={currentPage === 1 ? "passive" : ""}
          onClick={() => {
            if (currentPage === 1) return;
            handlePageChange(currentPage - 1);
          }}
        >
          <span>{"‹"}</span>
        </li>

        {pages}

        <li
          className={totalPageCount === currentPage ? "passive" : ""}
          onClick={() => {
            if (totalPageCount === currentPage) return;
            handlePageChange(currentPage + 1);
          }}
        >
          <span>{"›"}</span>
        </li>
        <li
          className={totalPageCount === currentPage ? "passive" : ""}
          onClick={() => {
            if (totalPageCount === currentPage) return;
            handlePageChange(totalPageCount);
          }}
        >
          <span>{"»"}</span>
        </li>
      </ul>
    </div>
  );
};

Pagination.displayName = "Pagination";
export default Pagination;
