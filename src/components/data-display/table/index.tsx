"use client";

import "../../../assets/css/components/data-display/table/styles.css";
import { ARIcon } from "../../icons";
import Button from "../../form/button";
import Checkbox from "../../form/checkbox";
import IProps, { SearchedParam } from "./IProps";
import Pagination from "../../navigation/pagination";
import React, { forwardRef, Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HTMLTableElementWithCustomAttributes, TableColumnType } from "../../../libs/types";
import Input from "../../form/input";
import Popover from "../../feedback/popover";
import Utils from "../../../libs/infrastructure/shared/Utils";
import Upload from "../../form/upload";

const Table = forwardRef(
  <T extends object>(
    {
      children,
      title,
      description,
      data,
      columns,
      actions,
      selections,
      previousSelections,
      searchedParams,
      pagination,
      config = { isSearchable: false },
    }: IProps<T>,
    ref: React.ForwardedRef<HTMLTableElementWithCustomAttributes>
  ) => {
    // refs
    const _tableWrapper = useRef<HTMLDivElement>(null);
    const _tableContent = useRef<HTMLDivElement>(null);
    const _checkboxItems = useRef<(HTMLInputElement | null)[]>([]);
    const _filterCheckboxItems = useRef<(HTMLInputElement | null)[]>([]);
    // refs -> Search
    const _searchTextInputs = useRef<(HTMLInputElement | null)[]>([]);
    const _searchTimeOut = useRef<NodeJS.Timeout | null>(null);

    // variables
    const _subrowOpenAutomatically: boolean = config.subrow?.openAutomatically ?? false;
    const _subrowSelector: string = config.subrow?.selector ?? "subitems";
    const _subrowButton: boolean = config.subrow?.button ?? false;

    // className
    const _tableClassName: string[] = ["ar-table", "scroll"];

    // states
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectionItems, setSelectionItems] = useState<T[]>([]);
    const [showSubitems, setShowSubitems] = useState<{ [key: string]: boolean }>({});
    const [isTrueSubitems, setIsTrueSubitems] = useState<{ [key: string]: boolean }>({});
    // states -> File
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState<FormData | undefined>(undefined);
    // states -> Search
    const [searchedText, setSearchedText] = useState<SearchedParam | undefined>(undefined);
    const [_searchedParams, setSearchedParams] = useState<SearchedParam | undefined>(undefined);
    const [checkboxSelectedParams, setCheckboxSelectedParams] = useState<SearchedParam | undefined>(undefined);
    // states -> Pagination
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    if (config && Object.keys(config.scroll || {}).length > 0) {
      if (_tableContent.current && config.scroll) {
        if (config.scroll.maxHeight) {
          _tableContent.current.style.maxHeight = `${config?.scroll?.maxHeight}rem`;
        }
      }
    }

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
          if (pagination && pagination.onChange) pagination.onChange(1);
        }, 750);
      } else {
        setSearchedText((prev) => {
          const _state = { ...prev };

          if (event.target.value === "") {
            delete _state[event.target.name]; // Key'i siliyoruz
          } else {
            _state[event.target.name] = event.target.value; // Yeni değeri ekliyoruz
          }

          return _state;
        });
      }

      setCurrentPage(1);
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

    // Derinlemesine arama yapmak için özyinelemeli bir fonksiyon olarak kullanılmaktadır.
    const deepSearch = (item: T, searchedText: SearchedParam | undefined): boolean => {
      if (!searchedText || Object.keys(searchedText).length === 0) return true;

      // Eğer değer bir sayı veya string ise, aranan metinle eşleşip eşleşmediğini kontrol ediyoruz.
      return Object.entries(searchedText).every(([key, value]) => {
        const _itemValue = item[key as keyof typeof item];

        if (typeof _itemValue === "number" || typeof _itemValue === "string" || typeof _itemValue === "boolean") {
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
              return value.some((v) => {
                if (Array.isArray(_itemValue)) {
                  return Object.values(_itemValue?.[0 as keyof typeof _itemValue] ?? {}).some((objValue) => {
                    return String(objValue).toLocaleLowerCase().includes(String(v).toLocaleLowerCase());
                  });
                }
              });
            }
          }
        }

        if (Array.isArray(_itemValue)) {
          console.log("Buradasın", _itemValue);
        }

        return false;
      });
    };

    const openAllSubrowsRecursively = (data: T[], parentKey: string = ""): Record<string, boolean> => {
      let result: Record<string, boolean> = {};

      data.forEach((item, index) => {
        const key = parentKey ? `${parentKey}.${index}` : `${index}`;
        const subitems = item[_subrowSelector as keyof typeof item];

        if (subitems && Array.isArray(subitems) && subitems.length > 0) {
          const nested = openAllSubrowsRecursively(subitems as T[], key);

          result[key] = true;
          result = { ...result, ...nested };
        }
      });

      return result;
    };

    const getData = useMemo(() => {
      let _data: T[] = [...data];

      if (_subrowOpenAutomatically) setShowSubitems(openAllSubrowsRecursively(data));

      if (searchedText && Object.keys(searchedText).length > 0) {
        _data = _data.filter((item) => deepSearch(item, searchedText));
        setTotalRecords(_data.length);
      } else {
        setTotalRecords(data.length);
      }

      if (pagination && !config.isServerSide) {
        const indexOfLastRow = currentPage * pagination.perPage;
        const indexOfFirstRow = indexOfLastRow - pagination.perPage;

        _data = _data.slice(indexOfFirstRow, indexOfLastRow);
      }

      // Veriler yenilenmesi durumunda tablo üzerindeki hesaplamalar tekrar yapılacaktır.
      setTimeout(() => handleScroll(), 0);

      return _data;
    }, [data, searchedText, currentPage]);

    const renderCell = (item: T, c: TableColumnType<T>, cIndex: number, index: number, depth: number) => {
      let render: any;

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
      } else {
        // Diğer durumlarda `null` döndür
        render = null;
      }

      const _className: string[] = [];
      if (c.config?.sticky) _className.push(`sticky-${c.config.sticky}`);
      if (c.config?.alignContent) _className.push(`align-content-${c.config.alignContent}`);
      if (c.config?.textWrap) _className.push(`text-${c.config.textWrap}`);

      return (
        <td
          key={`cell-${index}-${cIndex}`}
          className={_className.join(" ")}
          style={
            c.config?.width ? { minWidth: c.config.width, maxWidth: c.config.width, paddingLeft: `${depth}rem` } : {}
          }
          data-sticky-position={c.config?.sticky}
        >
          <div className="table-cell">{React.isValidElement(render) ? render : String(render)}</div>
        </td>
      );
    };

    const renderRow = (item: T, index: number) => {
      const isHasSubitems = _subrowSelector in item;
      // TODO: Keylere bakılacak...
      return (
        <Fragment key={`row-${index}`}>
          <tr key={`row-${index}`}>
            {selections && (
              <td className="sticky-left" data-sticky-position="left">
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

            {_subrowButton && isHasSubitems ? (
              <td>
                {item[_subrowSelector as keyof typeof item] && (
                  <div className="subitem-open-button-wrapper">
                    <span
                      className={`subitem-open-button ${(showSubitems[index] && "opened") ?? ""}`}
                      onClick={() => {
                        setShowSubitems((prev) => ({
                          ...prev,
                          [`${index}`]: !prev[`${index}`],
                        }));
                      }}
                    />
                  </div>
                )}
              </td>
            ) : _subrowButton ? (
              <td style={{ width: 0, minWidth: 0 }}></td>
            ) : null}

            {columns.map((c, cIndex) => renderCell(item, c, cIndex, index, 0))}
          </tr>

          {/* Alt satırları burada listele */}
          {showSubitems[index] && item[_subrowSelector as keyof typeof item] && (
            <SubitemList
              items={item[_subrowSelector as keyof typeof item] as T[]}
              columns={columns}
              index={index}
              depth={1.5}
            />
          )}
        </Fragment>
      );
    };

    const SubitemList = ({ items, columns, index, depth }: any) => {
      return items.map((subitem: T, subindex: number) => {
        const _subitem = subitem[_subrowSelector as keyof typeof subitem];

        // TODO: Keylere bakılacak...
        return (
          <Fragment key={`subitem-${index}-${subindex}-${Math.random()}`}>
            <tr key={`subitem-${index}-${subindex}-${Math.random()}`}>
              {_subrowSelector in subitem && _subrowButton && (
                <td style={{ paddingLeft: `${depth}rem` }}>
                  <div className="subitem-open-button-wrapper">
                    <span
                      className={`${(showSubitems[`${index}.${subindex}`] && "opened") ?? ""} ${
                        !_subitem && "passive"
                      }`}
                      onClick={() => {
                        if (!_subitem) return;

                        setShowSubitems((prev) => ({
                          ...prev,
                          [`${index}.${subindex}`]: !prev[`${index}.${subindex}`],
                        }));
                      }}
                    />
                  </div>
                </td>
              )}

              {columns.map((c: TableColumnType<T>, cIndex: number) =>
                renderCell(subitem, c, cIndex, subindex, depth * 1.5)
              )}
            </tr>

            {showSubitems[`${index}.${subindex}`] && _subitem && (
              <SubitemList
                key={`subitem-${index}-${subindex}-${Math.random()}`} // TODO: Daha sonra tekrar bakılacak...
                items={_subitem as T[]}
                columns={columns}
                index={subindex}
                depth={depth * 1.5}
              />
            )}
          </Fragment>
        );
      });
    };

    // useEffects
    useEffect(() => {
      // Eğer `previousSelections` özelliğinden değer geliyorsa bu daha önce seçim yapılmış öğeleri gönderiyorum
      // demektir ve otomatik olarak seçim yap demek anlamına gekmektedir.

      if (previousSelections && previousSelections.length > 0) {
        const validSelections = data.filter((item) =>
          previousSelections.some((selected) => JSON.stringify(selected) === JSON.stringify(item))
        );
        setSelectionItems(validSelections);
      }
    }, [previousSelections]);

    useEffect(() => {
      if (config?.isServerSide && searchedParams) {
        const query = new URLSearchParams(_searchedParams);

        columns.forEach((column) => {
          const getParamsLength = column.filters?.length;
          const searchedParamLength = Array.from(
            _searchedParams?.[column.key as keyof typeof _searchedParams] ?? []
          ).length;

          if (getParamsLength === searchedParamLength) query.delete(column.key as string);
        });

        searchedParams(_searchedParams, query.toString());
      }
    }, [_searchedParams]);

    useEffect(() => {
      if (config.isServerSide) {
        if (_searchTimeOut.current) clearTimeout(_searchTimeOut.current);

        setSearchedParams(checkboxSelectedParams);
      } else {
        setSearchedText((prev) => ({ ...prev, ...checkboxSelectedParams }));
      }

      setCurrentPage(1);
      if (pagination && pagination.onChange) pagination.onChange(1);
    }, [checkboxSelectedParams]);

    useEffect(() => {
      if (!selections) return;

      selections(selectionItems);
    }, [selectionItems]);

    useEffect(() => {
      if (!selections) return;

      if (_checkboxItems.current.length > 0) {
        setSelectAll(_checkboxItems.current.every((item) => item?.checked === true));
      }
    }, [selectionItems, currentPage]);

    return (
      <div ref={_tableWrapper} className={_tableClassName.map((c) => c).join(" ")}>
        {(title || description || actions || React.Children.count(children) > 0) && (
          <div className="header">
            <div className="title">
              <h3>{title}</h3>
              {description && <h5>{description}</h5>}
            </div>

            <div className="actions">
              {actions && (
                <>
                  {actions.import && (
                    <Popover
                      title="İçeri Aktar"
                      message="Seçtiğiniz dosyaları uygulamaya yükleyebilirsiniz. Bu işlem, dosyalardaki verileri sistemimize aktarır ve verilerle işlem yapmanıza olanak tanır."
                      content={
                        <>
                          {actions.import.prefixItem}

                          <Upload
                            text="Belge Yükleyin"
                            allowedTypes={actions.import.allowedTypes}
                            file={files}
                            onChange={(formData, files) => {
                              setFormData(formData);
                              setFiles(files);
                            }}
                            multiple
                          />

                          {actions.import.suffixItem}
                        </>
                      }
                      onConfirm={(confirm) => {
                        if (!confirm) {
                          setFiles([]);

                          return;
                        }

                        if (actions.import && actions.import.onClick) actions.import.onClick(formData, files);
                      }}
                      config={{ buttons: { okButton: "Yükle", cancelButton: "İptal" } }}
                      windowBlur
                    >
                      <Button
                        variant="outlined"
                        status="success"
                        icon={{ element: <ARIcon icon="Import" size={16} /> }}
                        tooltip={{ text: actions.import.tooltip, direction: "top" }}
                      />
                    </Popover>
                  )}

                  {actions.create && (
                    <Button
                      variant="outlined"
                      status="dark"
                      icon={{ element: <ARIcon icon="Add" size={16} /> }}
                      tooltip={{ text: actions.create.tooltip, direction: "top" }}
                      onClick={actions.create.onClick}
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
                {/* {data.some((item) => _subrowSelector in item) && <td style={{ width: 0, minWidth: 0 }}></td>} */}
                {_subrowButton && <td style={{ width: 0, minWidth: 0 }}></td>}

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
                            style: { minWidth: c.config.width, maxWidth: c.config.width },
                          }
                        : // : { style: { maxWidth: thWidths[cIndex], minWidth: thWidths[cIndex] } })}
                          { style: {} })}
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
                        {c.key && (
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
                                            value={filter.value as string}
                                            checked={checkboxSelectedParams?.[name]?.includes(String(filter.value))}
                                            onChange={async (event) => await handleCheckboxChange(event)}
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                }
                                windowBlur={true}
                              >
                                <Button
                                  variant="borderless"
                                  icon={{ element: <ARIcon icon="Filter" stroke="var(--primary)" size={16} /> }}
                                />
                              </Popover>
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              )}
            </thead>

            <tbody>
              {getData.map((item, index) => (
                <React.Fragment key={index}>{renderRow(item, index)}</React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && pagination.totalRecords > pagination.perPage && (
          <div className="footer">
            <span>
              <strong>Showing {getData.length}</strong>{" "}
              <span>of {pagination?.perPage ?? getData.length} agreement</span>
            </span>

            <Pagination
              totalRecords={config.isServerSide ? pagination.totalRecords : totalRecords ?? 0}
              currentPage={currentPage}
              perPage={pagination.perPage}
              onChange={(currentPage) => {
                if (config.isServerSide && pagination && pagination.onChange) pagination.onChange(currentPage);

                setCurrentPage(currentPage);
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

export default memo(Table, <T extends object>(prevProps: IProps<T>, nextProps: IProps<T>) => {
  const data = Utils.DeepEqual(prevProps.data, nextProps.data);
  const columns = Utils.DeepEqual(prevProps.columns, nextProps.columns);
  const actions = Utils.DeepEqual(prevProps.actions, nextProps.actions);
  const previousSelections = Utils.DeepEqual(prevProps.previousSelections, nextProps.previousSelections);

  return data && columns && actions && previousSelections;
}) as <T extends object>(props: IProps<T> & { ref?: React.Ref<HTMLTableElement> }) => JSX.Element;
