"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/data-display/table/table.css";
import Checkbox from "../../form/checkbox";
import Actions from "./Actions";
import Input from "../../form/input";
import Pagination from "../../navigation/pagination";

const Table = function <T extends object>({
  children,
  data,
  columns,
  selections,
  pagination,
  config,
}: IProps<T>) {
  // refs
  let _dataLength = useRef<number>(0);
  const _tableWrapper = useRef<HTMLDivElement>(null);
  const _tableContent = useRef<HTMLDivElement>(null);
  const _table = useRef<HTMLTableElement>(null);
  const _checkboxItems = useRef<(HTMLInputElement | null)[]>([]);
  // className
  const _tableClassName: string[] = ["ar-table", "scroll"];

  // states
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectionItems, setSelectionItems] = useState<T[]>([]);
  const [searchedText, setSearchedText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  if (config && Object.keys(config.scroll || {}).length > 0) {
    if (_tableContent.current && config.scroll) {
      if (config.scroll.maxHeight) {
        _tableContent.current.style.maxHeight = `${config?.scroll?.maxHeight}rem`;
      }
    }
  }

  // methods
  const handleOnScroll = () => {
    if (!_table.current || !_tableWrapper.current) return;

    const wrapperRect = _tableWrapper.current.getBoundingClientRect();

    const updateStickyPositions = (elements: NodeListOf<HTMLTableRowElement>) => {
      elements.forEach((element) => {
        const leftChildren = Array.from(element.childNodes)
          .filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)
          .filter((child) => child.dataset.stickyPosition === "left");
        const rightChildren = Array.from(element.childNodes)
          .filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)
          .filter((child) => child.dataset.stickyPosition === "right")
          .reverse();

        // Calculate positions and minimize `getBoundingClientRect` calls
        const leftRects = leftChildren.map((child) => child.getBoundingClientRect());
        const rightRects = rightChildren.map((child) => child.getBoundingClientRect());

        const leftPrevious = leftRects.map((rect) => Math.abs(rect.right - wrapperRect.left));
        const rightPrevious = rightRects.map((rect) => Math.abs(rect.left - wrapperRect.right));

        // #region Left
        leftChildren.forEach((child, index) => {
          const prevLeft = index > 0 ? leftPrevious[index - 1] : 0;

          if (index > 0) {
            const childLeft = leftRects[index].left - wrapperRect.left;

            if (Math.floor(childLeft) === Math.floor(prevLeft)) {
              if (!child.classList.contains("active-sticky")) child.classList.add("active-sticky");
            } else child.classList.remove("active-sticky");

            child.style.left = `${prevLeft}px`;
          } else child.classList.add("sticky");

          if (child.nodeName === "TD") child.style.zIndex = `${leftChildren.length - index}`;
        });
        // #endregion

        // #region Right
        rightChildren.forEach((child, index) => {
          const prevRight = index > 0 ? rightPrevious[index - 1] : 0;

          if (index > 0) {
            const childRight = Math.abs(rightRects[index].right - wrapperRect.right);

            if (Math.floor(childRight) === Math.floor(prevRight)) {
              if (!child.classList.contains("active-sticky")) child.classList.add("active-sticky");
            } else child.classList.remove("active-sticky");

            child.style.right = `${prevRight}px`;
          } else child.classList.add("sticky");
        });
        // #endregion
      });
    };

    const theadElements = _table.current.querySelectorAll<HTMLTableRowElement>("thead > tr");
    const tbodyElements = _table.current.querySelectorAll<HTMLTableRowElement>("tbody > tr");

    requestAnimationFrame(() => {
      updateStickyPositions(theadElements);
      updateStickyPositions(tbodyElements);
    });
  };

  // Derinlemesine arama yapmak için özyinelemeli bir fonksiyon tanımlayalım.
  const deepSearch = (value: any, searchedTexts: string[]): boolean => {
    if (value === null || value === undefined) return false;

    // Eğer değer bir sayı veya string ise, aranan metinle eşleşip eşleşmediğini kontrol ediyoruz.
    if (typeof value === "number" || typeof value === "string") {
      return searchedTexts.some((_searchedText) =>
        value.toString().toLowerCase().includes(_searchedText)
      );
    }

    // Eğer değer bir nesne veya dizi ise, içindeki her bir değeri yine deepSearch fonksiyonuyla kontrol ediyoruz.
    if (typeof value === "object") {
      return Object.values(value).some((innerValue) => deepSearch(innerValue, searchedTexts));
    }

    // Diğer türlerdeki değerleri atla.
    return false;
  };

  const getData = useCallback(() => {
    let _data: T[] = [...data];
    _dataLength.current = data.length;

    const indexOfLastRow = currentPage * pagination.perPage;
    const indexOfFirstRow = indexOfLastRow - pagination.perPage;

    if (!config?.isServer) _data = data.slice(indexOfFirstRow, indexOfLastRow);

    return searchedText
      ? _data.filter((item) => {
          // `some` kullanarak herhangi bir girişin arama koşulunu karşılayıp karşılamadığını kontrol ediyoruz.
          return Object.entries(item).some(([_key, _value]) =>
            deepSearch(
              _value,
              searchedText.split(",").map((text) => text.trim().toLowerCase())
            )
          );
        })
      : _data;
  }, [data, searchedText, currentPage]);

  // useEffects
  useEffect(() => {
    if (!selections || selectionItems.length === 0) return;

    selections(selectionItems);
  }, [selectionItems]);

  useEffect(() => {
    let allChecked = false;

    if (_checkboxItems.current.length > 0) {
      allChecked = _checkboxItems.current.every((item) => item?.checked === true);
    }

    setSelectAll(allChecked);
  }, [currentPage]);

  return (
    <div ref={_tableWrapper} className={_tableClassName.map((c) => c).join(" ")}>
      <div className="header">
        <div>
          <Input
            placeholder="Ara"
            onChange={(event) => setSearchedText(event.target.value.toLowerCase())}
          />
        </div>
        <div>{React.Children.map(children, (child) => child)}</div>
      </div>

      <div ref={_tableContent} className="content" onScroll={handleOnScroll}>
        <table ref={_table}>
          <thead>
            <tr key="selection">
              {selections && (
                <th className="selection-col sticky-left" data-sticky-position="left">
                  <Checkbox
                    variant="filled"
                    status="primary"
                    checked={selectAll}
                    onChange={(event) => {
                      if (_checkboxItems.current.length > 0) {
                        setSelectAll(event.target.checked);

                        _checkboxItems.current.forEach((item) => {
                          if (item) {
                            if (item.checked !== event.target.checked) item.click();
                          }
                        });
                      }
                    }}
                  />
                </th>
              )}

              {columns.map((c, cIndex) => {
                let _className: string[] = [];

                if (c.config?.sticky) _className.push(`sticky-${c.config.sticky}`);
                if (c.config?.alignContent) {
                  _className.push(`align-content-${c.config.alignContent}`);
                }

                return (
                  <th
                    key={`column-${cIndex}`}
                    {...(_className.length > 0 && {
                      className: `${_className.map((c) => c).join(" ")}`,
                    })}
                    {...(c.config?.sticky && {
                      "data-sticky-position": c.config.sticky,
                    })}
                  >
                    {c.title}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {getData().length > 0 ? (
              getData().map((item, index) => (
                <tr key={`row-${index}`}>
                  {selections && (
                    <td
                      key={`selection-${index}`}
                      className="sticky-left"
                      data-sticky-position="left"
                    >
                      <Checkbox
                        ref={(element) => (_checkboxItems.current[index] = element)}
                        status="primary"
                        checked={selectionItems.some(
                          (selectionItem) => JSON.stringify(selectionItem) === JSON.stringify(item)
                        )}
                        onChange={(event) => {
                          if (event.target.checked) setSelectionItems((prev) => [...prev, item]);
                          else setSelectionItems((prev) => prev.filter((_item) => _item !== item));
                        }}
                      />
                    </td>
                  )}

                  {columns.map((c, cIndex) => {
                    let _className: string[] = [];
                    let render: any; // TODO: Generic yapmak için çalışma yap. (Daha Sonra)

                    // `c.key` bir string ise
                    if (typeof c.key !== "object") {
                      render = c.render ? c.render(item) : item[c.key as keyof T];
                    }
                    // `c.key` bir nesne ise ve `nestedKey` mevcutsa
                    else if (typeof c.key === "object") {
                      const _item = item[c.key.field as keyof T];

                      if (_item && typeof _item === "object") {
                        render = c.render
                          ? c.render(item)
                          : _item[c.key.nestedKey as keyof typeof _item];
                      }
                    }
                    // Diğer durumlarda `null` döndür
                    else {
                      render = null;
                    }

                    // const isTypeOfNumber = typeof render === "number" ? "type-of-number" : "";

                    // if (isTypeOfNumber) _className.push(isTypeOfNumber);

                    if (c.config?.sticky) _className.push(`sticky-${c.config.sticky}`);

                    if (c.config?.alignContent) {
                      _className.push(`align-content-${c.config.alignContent}`);
                    }

                    return (
                      <td
                        key={`cell-${index}-${cIndex}`}
                        {...(_className.length > 0 && {
                          className: `${_className.map((c) => c).join(" ")}`,
                        })}
                        {...(c.config?.sticky && {
                          "data-sticky-position": c.config.sticky,
                        })}
                      >
                        {React.isValidElement(render) ? render : String(render)}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1}>Herhangi bir kayıt bulunamadı!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalRecords > pagination.perPage && (
        <div className="footer">
          <Pagination
            totalRecords={pagination.totalRecords}
            perPage={pagination.perPage}
            onChange={(currentPage) => {
              setCurrentPage(currentPage);

              // Table tarafında yapılan sayfalamayı dışarı aktarmak için kullanılan callback.
              pagination.onChange(currentPage);
            }}
          />
        </div>
      )}
    </div>
  );
};

Table.Action = Actions;

export default Table;
