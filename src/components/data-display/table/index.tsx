"use client";

import "../../../assets/css/components/data-display/table/styles.css";
import { ARIcon } from "../../icons";
import Button from "../../form/button";
import Checkbox from "../../form/checkbox";
import IProps, { SearchedParam } from "./IProps";
import Pagination from "../../navigation/pagination";
import React, { forwardRef, ReactElement, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { HTMLTableElementWithCustomAttributes } from "../../../libs/types";
import Actions from "./Actions";
import Input from "../../form/input";
import Popover from "../../feedback/popover";

const TableWithRef = forwardRef(
  <T extends object>(
    {
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
    }: IProps<T>,
    ref: React.ForwardedRef<HTMLTableElementWithCustomAttributes>
  ) => {
    // refs
    const _tableWrapper = useRef<HTMLDivElement>(null);
    const _table = useRef<HTMLTableElement>(null);
    const _tableContent = useRef<HTMLDivElement>(null);
    const _checkboxItems = useRef<(HTMLInputElement | null)[]>([]);
    const _filterCheckboxItems = useRef<(HTMLInputElement | null)[]>([]);
    // refs -> Search
    const _searchTextInputs = useRef<(HTMLInputElement | null)[]>([]);
    const _searchTimeOut = useRef<NodeJS.Timeout | null>(null);

    // className
    const _tableClassName: string[] = ["ar-table", "scroll"];

    // states
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectionItems, setSelectionItems] = useState<T[]>([]);
    const [thWidths, setThWidths] = useState<number[]>([]);
    // states -> Search
    const [searchedText, setSearchedText] = useState<SearchedParam | undefined>(undefined);
    const [_searchedParams, setSearchedParams] = useState<SearchedParam | undefined>(undefined);
    const [checkboxSelectedParams, setCheckboxSelectedParams] = useState<SearchedParam | undefined>(undefined);
    const [selectedfilterCheckboxItems, setSelectedfilterCheckboxItems] = useState<number | undefined>(undefined);

    // const [searchedFilters, setSearchedFilters] = useState<string | undefined>(undefined);
    // const [totalRecords, setTotalRecords] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    if (config && Object.keys(config.scroll || {}).length > 0) {
      if (_tableContent.current && config.scroll) {
        if (config.scroll.maxHeight) {
          _tableContent.current.style.maxHeight = `${config?.scroll?.maxHeight}rem`;
        }
      }
    }

    // Custom Attributes
    useImperativeHandle(ref, () => {
      const tableCurrent = _table.current as HTMLTableElement;

      return {
        ...tableCurrent,
        filterCleaner: () => {
          if (config.isServerSide) {
            setSearchedParams({});
            pagination && pagination.onChange(1);
          } else {
            setSearchedText({});
          }

          setCurrentPage(1);
          _searchTextInputs.current.map((item) => item && (item.value = ""));
        },
      };
    });

    // methods
    const handleScroll = () => {
      if (!_tableWrapper.current) return;

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

      const theadElements = _tableWrapper.current.querySelectorAll<HTMLTableRowElement>("table > thead > tr");
      const tbodyElements = _tableWrapper.current.querySelectorAll<HTMLTableRowElement>("table > tbody > tr");

      requestAnimationFrame(() => {
        updateStickyPositions(theadElements);
        updateStickyPositions(tbodyElements);
      });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (config.isServerSide) {
        if (_searchTimeOut.current) clearTimeout(_searchTimeOut.current);

        _searchTimeOut.current = setTimeout(() => {
          setSearchedParams((prev) => ({ ...prev, [event.target.name]: event.target.value }));
          setCurrentPage(1);
          pagination && pagination.onChange(1);
        }, 750);
      } else {
        setCurrentPage(1);
        setSearchedText((prev) => ({ ...prev, [event.target.name]: event.target.value }));
      }
    };

    const handleCheckboxChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();

      setCheckboxSelectedParams((prev) => {
        const updatedValues = new Set<string>(prev?.[event.target.name] || []);

        event.target.checked ? updatedValues.add(event.target.value) : updatedValues.delete(event.target.value);

        return {
          ...prev,
          ...(Array.from(updatedValues).length > 0
            ? { [event.target.name]: Array.from(updatedValues) }
            : { [event.target.name]: [] }),
        } as SearchedParam;
      });
    }, []);

    // Derinlemesine arama yapmak için özyinelemeli bir fonksiyon tanımlayalım.
    const deepSearch = (item: T, searchedText: SearchedParam | undefined): boolean => {
      if (!searchedText) return false;

      // Eğer değer bir sayı veya string ise, aranan metinle eşleşip eşleşmediğini kontrol ediyoruz.
      return Object.entries(searchedText).every(([key, value]) => {
        const _itemValue = item[key as keyof typeof item];

        if (typeof _itemValue === "number" || typeof _itemValue === "string") {
          if (Array.isArray(value)) {
            if (value.length === 0) return true;
            else return value.some((v) => _itemValue.toString().toLocaleLowerCase().includes(v.toLocaleLowerCase()));
          }

          return _itemValue.toString().toLocaleLowerCase().includes(value.toLocaleLowerCase());
        }

        if (typeof _itemValue === "object") {
          if (Array.isArray(value)) {
            if (value.length === 0) return true;
            else {
              return value.some((v) =>
                Object.entries(_itemValue ?? {}).some(([_, objValue]) =>
                  String(objValue).toLocaleLowerCase().includes(v.toLocaleLowerCase())
                )
              );
            }
          }

          return Object.entries(_itemValue ?? {}).some(([_, objValue]) =>
            String(objValue).toLocaleLowerCase().includes(value.toLocaleLowerCase())
          );
        }

        if (Array.isArray(_itemValue)) {
          console.log("Buradasın", _itemValue);
        }

        return false;
      });
    };

    const getData = useCallback(() => {
      let _data: T[] = [...data];

      if (searchedText) _data = _data.filter((item) => deepSearch(item, searchedText));

      if (pagination && !config.isServerSide) {
        const indexOfLastRow = currentPage * pagination.perPage;
        const indexOfFirstRow = indexOfLastRow - pagination.perPage;

        _data = _data.slice(indexOfFirstRow, indexOfLastRow);
      }

      // Veriler yenilenmesi durumunda tablo üzerindeki hesaplamalar tekrar yapılacaktır.
      setTimeout(() => handleScroll(), 0);

      return _data;
    }, [data, searchedText, currentPage]);

    // useEffects
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
      if (config.isServerSide) {
        if (_searchTimeOut.current) clearTimeout(_searchTimeOut.current);

        setSearchedParams(checkboxSelectedParams);
      } else {
        setSearchedText(checkboxSelectedParams);
      }

      setCurrentPage(1);
      pagination && pagination.onChange(1);
      setSelectedfilterCheckboxItems(_filterCheckboxItems.current.filter((x) => x?.checked).length);
    }, [checkboxSelectedParams]);

    useEffect(() => {
      if (!selections) return;

      let allChecked = false;

      if (_checkboxItems.current.length > 0) {
        allChecked = _checkboxItems.current.every((item) => item?.checked === true);
      }

      setSelectAll(allChecked);
    }, [currentPage]);

    useEffect(() => {
      if (!_tableContent.current) return;

      const th = _tableContent.current?.querySelectorAll("table > thead > tr:first-child > th");
      th.forEach((item) => setThWidths((prev) => [...prev, item.getBoundingClientRect().width]));
    }, []);

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

                  {actions.filterClear && (
                    <Button
                      variant="outlined"
                      status="dark"
                      icon={{ element: <ARIcon icon="Trash" size={16} /> }}
                      tooltip={{ text: actions.filterClear.tooltip, direction: "top" }}
                      onClick={actions.filterClear.onClick}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}

        <div ref={_tableContent} className="content" onScroll={handleScroll}>
          <table ref={ref}>
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
                  if (!c.config?.width) _className.push("min-w");
                  if (c.config?.alignContent) {
                    _className.push(`align-content-${c.config.alignContent}`);
                  }

                  return (
                    <th
                      key={`column-${cIndex}-${Math.random()}`}
                      {...(_className.length > 0 && {
                        className: `${_className.map((c) => c).join(" ")}`,
                      })}
                      {...(c.config?.width
                        ? {
                            style: { minWidth: c.config.width },
                          }
                        : { style: { maxWidth: thWidths[cIndex], minWidth: thWidths[cIndex] } })}
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
                  {selections && (
                    <th
                      key={`column-selections`}
                      className="selection-col sticky-left"
                      data-sticky-position="left"
                    ></th>
                  )}

                  {columns.map((c, cIndex) => {
                    if (!c.key) return <th></th>;

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
                        <div className="filter-field">
                          <Input
                            ref={(element) => (_searchTextInputs.current[cIndex] = element)}
                            variant={c.key && !c.filters ? "filled" : "outlined"}
                            status="light"
                            name={typeof c.key !== "object" ? String(c.key) : String(c.key.field)}
                            onChange={handleSearch}
                            disabled={!c.key || !!c.filters}
                          />

                          {c.filters && (
                            <Popover
                              content={
                                <>
                                  {/* <Input
                                    placeholder="Search..."
                                    onChange={(event) => setSearchedFilters(event.target.value.toLocaleLowerCase())}
                                  /> */}

                                  <div>
                                    {c.filters.map((filter, fIndex) => {
                                      const name = typeof c.key !== "object" ? String(c.key) : String(c.key.field);

                                      return (
                                        <div>
                                          <Checkbox
                                            ref={(element) => (_filterCheckboxItems.current[fIndex] = element)}
                                            label={filter.text}
                                            name={name}
                                            status="primary"
                                            value={filter.value}
                                            checked={checkboxSelectedParams?.[name]?.includes(String(filter.value))}
                                            onChange={async (event) => await handleCheckboxChange(event)}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              }
                              windowBlur={true}
                            >
                              {(selectedfilterCheckboxItems ?? 0) > 0 && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "0.35rem",
                                    right: "0.35rem",
                                    width: "0.5rem",
                                    height: "0.5rem",
                                    backgroundColor: "var(--danger)",
                                    borderRadius: "var(--border-radius-pill)",
                                    zIndex: 1,
                                  }}
                                ></div>
                              )}
                              <Button
                                variant="borderless"
                                icon={{ element: <ARIcon icon="Filter" stroke="var(--primary)" size={16} /> }}
                              />
                            </Popover>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              )}
            </thead>

            <tbody>
              {getData().length > 0 ? (
                getData().map((item, index) => (
                  <tr key={`row-${index}-${Math.random()}`}>
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
                          {...(_className.length > 0 && {
                            className: `${_className.map((c) => c).join(" ")}`,
                          })}
                          {...(c.config?.width
                            ? {
                                style: { minWidth: c.config.width },
                              }
                            : {
                                style: { maxWidth: thWidths[cIndex], minWidth: thWidths[cIndex] },
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
            <span>
              <strong>Showing {getData().length}</strong>{" "}
              <span>of {pagination?.perPage ?? getData().length} agreement</span>
            </span>

            <Pagination
              totalRecords={pagination.totalRecords}
              currentPage={currentPage}
              perPage={pagination.perPage}
              onChange={(currentPage) => {
                config.isServerSide && pagination.onChange(currentPage);
                setCurrentPage(currentPage);
              }}
            />
          </div>
        )}
      </div>
    );
  }
) as <T>(props: IProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }) => ReactElement;

type TableCompoundComponents = typeof TableWithRef & {
  Actions: React.FC<{
    children: React.ReactElement | React.ReactElement[];
  }>;
};

// Actions'ı ekliyoruz.
const Table = TableWithRef as TableCompoundComponents;
Table.Actions = Actions;

export default Table;
