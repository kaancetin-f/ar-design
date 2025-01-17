"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import IProps, { SearchedParam } from "./IProps";
import "../../../assets/css/components/data-display/table/styles.css";
import Checkbox from "../../form/checkbox";
import Actions from "./Actions";
import Pagination from "../../navigation/pagination";
import Button from "../../form/button";
import { ARIcon } from "../../icons";

type SearchedText = { [key: string]: string };

const Table = function <T extends object>({
  children,
  title,
  description,
  data,
  columns,
  actions,
  selections,
  searchedParams,
  pagination,
  config = { isSearchable: false },
}: IProps<T>) {
  // refs
  let _dataLength = useRef<number>(0);
  const _tableWrapper = useRef<HTMLDivElement>(null);
  const _tableContent = useRef<HTMLDivElement>(null);
  const _table = useRef<HTMLTableElement>(null);
  const _checkboxItems = useRef<(HTMLInputElement | null)[]>([]);
  const _searchTimeOut = useRef<NodeJS.Timeout | null>(null);
  // className
  const _tableClassName: string[] = ["ar-table", "scroll"];

  // states
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectionItems, setSelectionItems] = useState<T[]>([]);
  const [searchedText, setSearchedText] = useState<SearchedText | undefined>(undefined);
  const [_searchedParams, setSearchedParams] = useState<SearchedParam | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
  const deepSearch = (item: T, searchedText: SearchedText | undefined): boolean => {
    if (!searchedText) return false;

    // Eğer değer bir sayı veya string ise, aranan metinle eşleşip eşleşmediğini kontrol ediyoruz.
    return Object.entries(searchedText).every(([key, value]) => {
      const _itemValue = item[key as keyof typeof item];

      if (typeof _itemValue === "number" || typeof _itemValue === "string") {
        return _itemValue.toString().toLowerCase().includes(value.toLowerCase());
      }

      if (typeof _itemValue === "object") {
        deepSearch(_itemValue as T, searchedText);
      }

      // Diğer türlerdeki değerleri atla.
      return false;
    });
  };

  const getData = useCallback(() => {
    let _data: T[] = [...data];
    _dataLength.current = data.length;

    if (pagination && !config.isServerSide) {
      const indexOfLastRow = currentPage * pagination.perPage;
      const indexOfFirstRow = indexOfLastRow - pagination.perPage;

      _data = data.slice(indexOfFirstRow, indexOfLastRow);
    }

    if (searchedText) _data = _data.filter((item) => deepSearch(item, searchedText));

    return _data;
  }, [data, searchedText, currentPage]);

  // useEffects
  useEffect(() => {
    handleOnScroll();
  }, [data]);

  useEffect(() => {
    if (!selections || selectionItems.length === 0) return;

    selections(selectionItems);
  }, [selectionItems]);

  useEffect(() => {
    if (config?.isServerSide && searchedParams) {
      // const query = Object.entries(_searchedParams ?? {})
      //   .map(([key, value]) => {
      //     return `${key}=${value}`;
      //   })
      //   .join("&");

      const query = new URLSearchParams(_searchedParams).toString();
      searchedParams(_searchedParams, query);
    }
  }, [_searchedParams]);

  useEffect(() => {
    if (!selections) return;

    let allChecked = false;

    if (_checkboxItems.current.length > 0) {
      allChecked = _checkboxItems.current.every((item) => item?.checked === true);
    }

    setSelectAll(allChecked);
  }, [currentPage]);

  return (
    <div ref={_tableWrapper} className={_tableClassName.map((c) => c).join(" ")}>
      {(title || description || actions || React.Children.count(children) > 0) && (
        <div className="header">
          <div className="title">
            <h3>{title}</h3>
            <h5>{description}</h5>
          </div>

          <div className="actions">
            {React.Children.count(children) > 0 && <div>{React.Children.map(children, (child) => child)}</div>}

            {actions && (
              <>
                {actions.create && (
                  <Button
                    variant="outlined"
                    status="dark"
                    icon={{ element: <ARIcon icon="Add" size={16} /> }}
                    tooltip={{ text: actions.create.tooltip, direction: "top" }}
                    onClick={actions.create.onClick}
                  />
                )}

                {actions.import && (
                  <Button
                    variant="outlined"
                    status="dark"
                    icon={{ element: <ARIcon icon="Import" size={16} /> }}
                    tooltip={{ text: actions.import.tooltip, direction: "top" }}
                    onClick={actions.import.onClick}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

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

            {config?.isSearchable && (
              <tr key="isSearchable">
                {selections && <th key={`column-selections`}></th>}

                {columns.map((c, cIndex) => {
                  let _className: string[] = [];

                  if (c.config?.sticky) _className.push(`sticky-${c.config.sticky}`);
                  if (c.config?.alignContent) {
                    _className.push(`align-content-${c.config.alignContent}`);
                  }

                  if (!c.key)
                    return (
                      <th
                        key={`column-${cIndex}`}
                        {...(_className.length > 0 && {
                          className: `${_className.map((c) => c).join(" ")}`,
                        })}
                        {...(c.config?.sticky && {
                          "data-sticky-position": c.config.sticky,
                        })}
                      ></th>
                    );

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
                      <input
                        name={typeof c.key !== "object" ? String(c.key) : String(c.key.field)}
                        className="search-input"
                        onChange={(event) => {
                          if (config.isServerSide) {
                            if (_searchTimeOut.current) clearTimeout(_searchTimeOut.current);

                            _searchTimeOut.current = setTimeout(() => {
                              setSearchedParams((prev) => ({ ...prev, [event.target.name]: event.target.value }));
                              pagination && pagination.onChange(1);
                            }, 750);
                          } else {
                            setSearchedText((prev) => ({ ...prev, [event.target.name]: event.target.value }));
                          }
                        }}
                      />
                    </th>
                  );
                })}
              </tr>
            )}
          </thead>

          <tbody>
            {getData().length > 0 ? (
              getData().map((item, index) => (
                <tr key={`row-${index}`}>
                  {selections && (
                    <td key={`selection-${index}`} className="sticky-left" data-sticky-position="left">
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
                        render = c.render ? c.render(item) : _item[c.key.nestedKey as keyof typeof _item];
                      }
                    }
                    // Diğer durumlarda `null` döndür
                    else {
                      render = null;
                    }

                    // const isTypeOfNumber = typeof render === "number" ? "type-of-number" : "";

                    // if (isTypeOfNumber) _className.push(isTypeOfNumber);

                    if (c.config?.sticky) _className.push(`sticky-${c.config.sticky}`);
                    if (c.config?.alignContent) _className.push(`align-content-${c.config.alignContent}`);
                    if (c.config?.textWrap) _className.push(`text-${c.config.textWrap}`);

                    return (
                      <td
                        key={`cell-${index}-${cIndex}`}
                        {...(c.config?.width && {
                          style: { minWidth: c.config.width },
                        })}
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

      {pagination && pagination.totalRecords > pagination.perPage && (
        <div className="footer">
          <React.Fragment>
            <span>
              <strong>Showing {getData().length}</strong>{" "}
              <span>of {pagination?.perPage ?? getData().length} agreement</span>
            </span>

            <Pagination
              totalRecords={pagination.totalRecords}
              perPage={pagination.perPage}
              onChange={(currentPage) => {
                !config.isServerSide ? setCurrentPage(currentPage) : pagination.onChange(currentPage);
              }}
            />
          </React.Fragment>
        </div>
      )}
    </div>
  );
};

Table.Action = Actions;

export default Table;
