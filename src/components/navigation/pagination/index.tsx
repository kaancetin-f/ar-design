"use client";

import React, { useContext, useEffect, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/navigation/pagination/pagination.css";
import { ConfigContext } from "../../../libs/core/application/contexts/Config";

const Pagination: React.FC<IProps> = ({ defaultCurrent = 1, totalRecords, perPage, onChange }) => {
  // context
  const { config } = useContext(ConfigContext);

  // states
  const [pages, setPages] = useState<React.JSX.Element[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(defaultCurrent);

  // useEffect
  useEffect(() => {
    if (totalRecords === 0) return;

    const totalPages = Math.ceil(totalRecords / (perPage ?? config.perPage));
    const liItems = [];

    // Başlangıç ve bitiş aralığını hesapla.
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

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
        <li
          key={i}
          className={i === currentPage ? "selection-page" : ""}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </li>
      );
    }

    // Son sayfa ve ... eklemek.
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        liItems.push(
          <li key="end-ellipsis" className="end-ellipsis">
            ...
          </li>
        );
      }

      liItems.push(
        <li key={totalPages} onClick={() => setCurrentPage(totalPages)}>
          {totalPages}
        </li>
      );
    }

    setPages(liItems);
    onChange(currentPage);
  }, [totalRecords, currentPage]);

  return (
    <div className="ar-pagination">
      <ul>
        <li
          className={currentPage === 1 ? "passive" : ""}
          onClick={() => {
            if (currentPage === 1) return;

            setCurrentPage(1);
          }}
        >
          <span>{"«"}</span>
        </li>
        <li
          className={currentPage === 1 ? "passive" : ""}
          onClick={() => {
            if (currentPage === 1) return;

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
          className={
            Math.ceil(totalRecords / (perPage || config.perPage)) === currentPage ? "passive" : ""
          }
          onClick={() => {
            if (Math.ceil(totalRecords / (perPage || config.perPage)) === currentPage) return;

            setCurrentPage((prev) => {
              if (prev === Math.ceil(totalRecords / (perPage || config.perPage))) return prev;
              return (prev += 1);
            });
          }}
        >
          <span>{"›"}</span>
        </li>
        <li
          className={
            Math.ceil(totalRecords / (perPage || config.perPage)) === currentPage ? "passive" : ""
          }
          onClick={() => {
            if (Math.ceil(totalRecords / (perPage || config.perPage)) === currentPage) return;

            setCurrentPage(Math.ceil(totalRecords / (perPage || config.perPage)));
          }}
        >
          <span>{"»"}</span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
