"use client";

import "../../../assets/css/components/data-display/table/styles.css";
import { ARIcon } from "../../icons";
import Button from "../../form/button";
import Checkbox from "../../form/checkbox";
import IProps, { FilterValue, SearchedParam } from "./IProps";
import Pagination from "../../navigation/pagination";
import React, {
  ChangeEvent,
  forwardRef,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HTMLTableElementWithCustomAttributes, Option, TableColumnType } from "../../../libs/types";
import Input from "../../form/input";
import Popover from "../../feedback/popover";
import Utils from "../../../libs/infrastructure/shared/Utils";
import Upload from "../../form/upload";
import FilterPopup from "./FilterPopup";
import { FilterOperator } from "../../../libs/infrastructure/shared/Enums";
import Select from "../../form/select";
import Grid from "../grid-system";
import THeadCell from "./THeadCell";
import Tooltip from "../../feedback/tooltip";

const filterOption: Option[] = [
  { value: FilterOperator.Contains, text: "İçerir" },
  { value: FilterOperator.DoesNotContains, text: "İçermez" },
  { value: FilterOperator.Equals, text: "Eşittir" },
  { value: FilterOperator.DoesNotEquals, text: "Eşit değildir" },
  { value: FilterOperator.BeginsWith, text: "İle başlar" },
  { value: FilterOperator.EndsWith, text: "İle biter" },
  { value: FilterOperator.Blank, text: "Boş" },
  { value: FilterOperator.NotBlank, text: "Boş değil" },
];

const { Row, Column } = Grid;

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
    // refs -> Filter
    const _filterButton = useRef<(HTMLSpanElement | null)[]>([]);

    // variables
    const _subrowOpenAutomatically: boolean = config.subrow?.openAutomatically ?? false;
    const _subrowSelector: string = config.subrow?.selector ?? "subitems";
    const _subrowButton: boolean = config.subrow?.button ?? true;

    // className
    const _tableClassName: string[] = ["ar-table", "scroll"];

    // states
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectionItems, setSelectionItems] = useState<T[]>([]);
    const [showSubitems, setShowSubitems] = useState<{ [key: string]: boolean }>({});
    // states -> File
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState<FormData | undefined>(undefined);
    // states -> Search
    const [searchedText, setSearchedText] = useState<SearchedParam | null>(null);
    const [_searchedParams, setSearchedParams] = useState<SearchedParam | null>(null);
    const [checkboxSelectedParams, setCheckboxSelectedParams] = useState<SearchedParam | null>(null);
    // states -> Filter
    const [filterButtonCoordinate, setFilterButtonCoordinate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [filterPopupContent, setFilterPopupContent] = useState<JSX.Element | null>(null);
    const [filterPopupOption, setFilterPopupOption] = useState<{ key: string; option: Option | undefined } | null>(
      null
    );
    const [filterPopupOptionSearchText, setFilterPopupOptionSearchText] = useState<string | null>(null);
    // states -> Filter Fields Backup
    const [filterCurrentColumn, setFilterCurrentColumn] = useState<TableColumnType<T> | null>(null);
    const [filterCurrentDataType, setFilterCurrentDataType] = useState<
      "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | null
    >(null);
    const [filterCurrentIndex, setFilterCurrentIndex] = useState<number | null>(null);
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
    const handleScroll = useCallback(() => {
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

            if (child.nodeName === "TD") child.style.zIndex = `5`;
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
    }, []);

    const handleSearch = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const operator =
          filterPopupOption?.key == name
            ? (filterPopupOption.option?.value as FilterOperator)
            : FilterOperator.Contains;

        if (config.isServerSide) {
          if (_searchTimeOut.current) clearTimeout(_searchTimeOut.current);

          _searchTimeOut.current = setTimeout(() => {
            setSearchedParams((prev) => ({
              ...prev,
              [name]: { value: value, operator: operator },
            }));
            if (pagination && pagination.onChange) pagination.onChange(1);
          }, 750);
        } else {
          setSearchedText((prev) => {
            const _state = { ...prev };

            if (value === "") {
              delete _state[name]; // Key'i siliyoruz
            } else {
              _state[name] = { value: value, operator: operator }; // Yeni değeri ekliyoruz
            }

            return _state;
          });
        }

        event.target.value = value;

        setCurrentPage(1);
      },
      [filterPopupOption]
    );

    const handleCheckboxChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();

      const { name, value, checked } = event.target;

      setCheckboxSelectedParams((prev) => {
        const prevFilters = (prev?.[name] as FilterValue[]) || [];
        const updatedSet = new Set(prevFilters.map((f) => String(f.value)));

        checked ? updatedSet.add(value) : updatedSet.delete(value);

        const updatedArray: FilterValue[] = Array.from(updatedSet).map((v) => ({
          value: v,
          operator: FilterOperator.Equals, // Checkbox’lar genelde “Equals” anlamındadır.
        }));

        return {
          ...prev,
          ...(updatedArray.length > 0 ? { [name]: updatedArray } : { [name]: [] }),
        };
      });
    }, []);

    const handleFilterPopupContent = (
      c: TableColumnType<T>,
      dataType: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function",
      index: number | null
    ) => {
      const key = typeof c.key !== "object" ? String(c.key) : String(c.key.field);
      const value = Array.isArray(searchedText?.[key])
        ? "" // veya ihtiyacına göre birleştirme yap: searchedText[key].map(v => v.value).join(", ").
        : ((searchedText?.[key] as FilterValue)?.value as string);

      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        const input = _searchTextInputs.current[index ?? 0];

        if (input) {
          const event = new Event("input", { bubbles: true });
          input.value = value;
          input.dispatchEvent(event);
        }
      };

      setFilterPopupContent(() => {
        switch (dataType) {
          case "string":
          case "number":
            return (
              <Row>
                <Column size={12}>
                  <Select
                    value={
                      filterOption.find(
                        (x) => x.value === filterPopupOption?.option?.value && filterPopupOption.key === c.key
                      ) ?? filterOption[0]
                    }
                    options={filterOption}
                    onChange={(option) => {
                      setFilterPopupOption({ key: c.key as string, option: option });
                    }}
                    placeholder="Koşul"
                  />
                </Column>
                <Column size={12}>
                  <Input value={value ?? ""} onChange={handleChange} placeholder="Ara" />
                </Column>
              </Row>
            );
          case "object":
          case "boolean":
            return (
              <Row>
                <Column size={12}>
                  <Input
                    placeholder="Ara"
                    value={value ?? ""}
                    onChange={(event) => setFilterPopupOptionSearchText(event.target.value)}
                  />
                </Column>

                <Column size={12}>
                  {c.filters
                    ?.filter((filter) =>
                      filter.text.toLocaleLowerCase().includes(filterPopupOptionSearchText?.toLocaleLowerCase() ?? "")
                    )
                    ?.map((filter, fIndex) => {
                      const name = typeof c.key !== "object" ? String(c.key) : String(c.key.field);

                      return (
                        <div>
                          <Checkbox
                            ref={(element) => (_filterCheckboxItems.current[fIndex] = element)}
                            variant="filled"
                            color="green"
                            label={filter.text}
                            name={name}
                            value={filter.value as string}
                            checked={
                              Array.isArray(checkboxSelectedParams?.[name]) &&
                              checkboxSelectedParams?.[name]?.some((f) => String(f.value) === String(filter.value))
                            }
                            onChange={async (event) => await handleCheckboxChange(event)}
                          />
                        </div>
                      );
                    })}
                </Column>
              </Row>
            );

          default:
            return <></>;
        }
      });
    };

    // Derinlemesine arama yapmak için özyinelemeli bir fonksiyon olarak kullanılmaktadır.
    const deepSearch = (item: T, searchedText: SearchedParam | undefined): boolean => {
      if (!searchedText || Object.keys(searchedText).length === 0) return true;

      const applyOperator = (value: any, filter: FilterValue): boolean => {
        if (Array.isArray(value)) {
          // Array içindeki herhangi bir öğe eşleşirse true dön
          return value.some((item) => applyOperator(item, filter));
        }

        if (typeof value === "object" && value !== null) {
          // Eğer obje ise, içindeki değerlerden biri eşleşirse true dön
          return Object.values(value).some((v) => applyOperator(v, filter));
        }

        const text = String(value ?? "").toLocaleLowerCase();
        const searchText = String(filter.value ?? "").toLocaleLowerCase();

        switch (filter.operator) {
          case FilterOperator.Contains:
            return text.includes(searchText);
          case FilterOperator.DoesNotContains:
            return !text.includes(searchText);
          case FilterOperator.Equals:
            return text === searchText;
          case FilterOperator.DoesNotEquals:
            return text !== searchText;
          case FilterOperator.BeginsWith:
            return text.startsWith(searchText);
          case FilterOperator.EndsWith:
            return text.endsWith(searchText);
          case FilterOperator.Blank:
            return text.trim() === "";
          case FilterOperator.NotBlank:
            return text.trim() !== "";
          default:
            return false;
        }
      };

      return Object.entries(searchedText).every(([key, param]) => {
        const _itemValue = item[key as keyof typeof item];

        if (Array.isArray(param)) {
          if (param.length === 0) return true;
          return param.some((filter) => applyOperator(_itemValue, filter));
        } else {
          return applyOperator(_itemValue, param);
        }
      });

      // Eğer değer bir sayı veya string ise, aranan metinle eşleşip eşleşmediğini kontrol ediyoruz.
      // return Object.entries(searchedText).every(([key, param]) => {
      //   const _itemValue = item[key as keyof typeof item];

      //   if (typeof _itemValue === "number" || typeof _itemValue === "string" || typeof _itemValue === "boolean") {
      //     if (Array.isArray(param)) {
      //       if (param.length === 0) return true;
      //       else return param.some((v) => _itemValue.toString().toLocaleLowerCase().includes(v.toLocaleLowerCase()));
      //     }

      //     return _itemValue
      //       .toString()
      //       .toLocaleLowerCase()
      //       .includes(param.toLocaleLowerCase() ?? "");
      //   }

      //   if (typeof _itemValue === "object") {
      //     if (Array.isArray(param)) {
      //       if (param.length === 0) return true;
      //       else {
      //         return param.some((v) => {
      //           if (Array.isArray(_itemValue)) {
      //             return Object.values(_itemValue?.[0 as keyof typeof _itemValue] ?? {}).some((objValue) => {
      //               return String(objValue).toLocaleLowerCase().includes(String(v).toLocaleLowerCase());
      //             });
      //           }
      //         });
      //       }
      //     }
      //   }

      //   if (Array.isArray(_itemValue)) {
      //     console.log("Buradasın", _itemValue);
      //   }

      //   return false;
      // });
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

    const renderRow = (item: T, index: number, deph: number) => {
      const isHasSubitems = _subrowSelector in item;
      // TODO: Keylere bakılacak...
      return (
        <Fragment key={`row-${index}`}>
          <tr key={`row-${index}`}>
            {selections && (
              <td className="flex justify-content-center sticky-left" data-sticky-position="left">
                <Checkbox
                  ref={(element) => (_checkboxItems.current[index] = element)}
                  variant="filled"
                  color="green"
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

            {isHasSubitems && _subrowButton ? (
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
            ) : isHasSubitems && _subrowButton ? (
              <td style={{ width: 0, minWidth: 0 }}></td>
            ) : null}

            {columns.map((c, cIndex) => renderCell(item, c, cIndex, index, deph * (config.isTreeView ? 1.75 : 0), 0))}
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

    const renderCell = (
      item: T,
      c: TableColumnType<T>,
      cIndex: number,
      index: number,
      depth: number,
      level: number,
      isSubrows: boolean = false
    ) => {
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
          style={c.config?.width ? { minWidth: c.config.width, maxWidth: c.config.width } : {}}
          data-sticky-position={c.config?.sticky}
        >
          <div style={{ paddingLeft: `${depth == 0 ? 1 : depth}rem` }} className="table-cell">
            {config.isTreeView && cIndex === 0 && (
              <>
                {isSubrows &&
                  Array.from({ length: level }).map((_, i) => {
                    if (i > 0) i *= 1.655;

                    return (
                      <div key={`last-before-${i}`} style={{ left: `${i + 0.65}rem` }} className="last-before"></div>
                    );
                  })}
                <div className="before"></div>
              </>
            )}
            {React.isValidElement(render) ? render : String(render)}
            {config.isTreeView && cIndex === 0 && (
              <div className="after">
                <div className="circle"></div>
              </div>
            )}
          </div>
        </td>
      );
    };

    const SubitemList = ({ items, columns, index, depth, level = 1 }: any) => {
      return items.map((subitem: T, subindex: number) => {
        const _subitem = subitem[_subrowSelector as keyof typeof subitem];
        const isHasSubitems = _subrowSelector in subitem;

        // TODO: Keylere bakılacak...
        return (
          <Fragment key={`subitem-${index}-${subindex}-${Math.random()}`}>
            <tr
              key={`subitem-${index}-${subindex}-${Math.random()}`}
              className={`subrow-item ${_subrowButton ? "type-b" : "type-a"}`}
              data-level={level}
            >
              {isHasSubitems && _subrowButton ? (
                <td>
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
              ) : !isHasSubitems && _subrowButton ? (
                <td style={{ width: 0, minWidth: 0 }}></td>
              ) : null}

              {columns.map((c: TableColumnType<T>, cIndex: number) =>
                renderCell(subitem, c, cIndex, subindex, depth * (config.isTreeView ? 2.25 : 1.75), level, true)
              )}
            </tr>

            {showSubitems[`${index}.${subindex}`] && _subitem && (
              <SubitemList
                key={`subitem-${index}-${subindex}-${Math.random()}`} // TODO: Daha sonra tekrar bakılacak...
                items={_subitem as T[]}
                columns={columns}
                index={subindex}
                depth={depth + 0.75}
                level={level + 1}
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
        const searchRecord: Record<string, string> = {};

        Object.entries(_searchedParams ?? {}).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // Çoklu filtre değerleri varsa virgülle birleştir.
            searchRecord[key] = value.map((v) => v.value).join(",");
          } else if (value && typeof value === "object") {
            searchRecord[key] = String(value.value);
          }
        });

        const query = new URLSearchParams(searchRecord);

        columns.forEach((column) => {
          const key = column.key as keyof typeof _searchedParams;
          const filterValue = _searchedParams?.[key];

          const filterArray = Array.isArray(filterValue) ? filterValue : filterValue ? [filterValue] : [];

          const getParamsLength = column.filters?.length ?? 0;
          const searchedParamLength = filterArray.length;

          if (getParamsLength === searchedParamLength) {
            query.delete(column.key as string);
          }
        });

        searchedParams(_searchedParams, query.toString(), filterPopupOption?.option?.value as FilterOperator);
      }
    }, [_searchedParams]);

    useEffect(() => {
      if (!checkboxSelectedParams) return;

      if (config.isServerSide) {
        if (_searchTimeOut.current) clearTimeout(_searchTimeOut.current);
        setSearchedParams((prev) => ({ ...prev, ...checkboxSelectedParams }));
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

    useEffect(() => {
      // Filter Content alanı re-render işlemi.
      if (filterCurrentColumn && filterCurrentDataType) {
        handleFilterPopupContent(filterCurrentColumn, filterCurrentDataType, filterCurrentIndex);
      }
    }, [checkboxSelectedParams, filterPopupOption, filterPopupOptionSearchText]);

    return (
      <div ref={_tableWrapper} className={_tableClassName.map((c) => c).join(" ")}>
        {(title || description || actions || React.Children.count(children) > 0) && (
          <div className="header">
            <div className="title">
              <h4>{title}</h4>
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
                      config={{ buttons: { okay: "Yükle", cancel: "İptal" } }}
                      windowBlur
                    >
                      <Tooltip text={actions.import.tooltip}>
                        <Button variant="outlined" color="purple" icon={{ element: <ARIcon icon="Upload" /> }} />
                      </Tooltip>
                    </Popover>
                  )}

                  {actions.create && (
                    <Tooltip text={actions.create.tooltip}>
                      <Button
                        variant="outlined"
                        color="green"
                        icon={{ element: <ARIcon icon="Add" size={24} /> }}
                        onClick={actions.create.onClick}
                      />
                    </Tooltip>
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
                {data.some((item) => _subrowSelector in item) && _subrowButton && (
                  <td style={{ width: 0, minWidth: 0 }}></td>
                )}

                {selections && (
                  <th className="selection-col sticky-left" data-sticky-position="left">
                    <Checkbox
                      variant="filled"
                      color="green"
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

                <THeadCell columns={columns} />
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

                  {/* Buraya */}
                  {columns.map((c, cIndex) => {
                    let _className: string[] = [];
                    const key = typeof c.key !== "object" ? String(c.key) : String(c.key.field);
                    const csrValue = Array.isArray(searchedText?.[key])
                      ? "" // veya ihtiyacına göre birleştirme yap: searchedText[key].map(v => v.value).join(", ").
                      : ((searchedText?.[key] as FilterValue)?.value as string);
                    const ssrValue = Array.isArray(_searchedParams?.[key])
                      ? "" // veya ihtiyacına göre birleştirme yap: _searchedParams[key].map(v => v.value).join(", ").
                      : ((_searchedParams?.[key] as FilterValue)?.value as string);

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
                              variant={c.key && !c.filters ? "outlined" : "filled"}
                              style={{ height: "2rem" }}
                              value={(config.isServerSide ? ssrValue : csrValue) ?? ""}
                              name={key}
                              onInput={handleSearch}
                              disabled={!c.key || !!c.filters}
                            />

                            <span
                              ref={(element) => (_filterButton.current[cIndex] = element)}
                              onClick={(event) => {
                                event.stopPropagation();

                                // Temizlik...
                                setFilterPopupOptionSearchText("");

                                const rect = event.currentTarget.getBoundingClientRect();
                                const screenCenterX = window.innerWidth / 2;
                                // const screenCenterY = window.innerHeight / 2;
                                const coordinateX = rect.x > screenCenterX ? rect.x + rect.width - 225 : rect.x;
                                const coordinateY = rect.y + rect.height;
                                // data içindeki alanların tiplerini bulmak için kullanılmaktadır
                                const getDataFirstItem = { ...data[0] };
                                const key = typeof c.key !== "object" ? String(c.key) : String(c.key.field);

                                const getValueByKey = getDataFirstItem[key as keyof typeof getDataFirstItem];
                                let dataType = typeof getValueByKey;

                                if (getValueByKey == null) dataType = "string";

                                setFilterButtonCoordinate({ x: coordinateX, y: coordinateY });
                                setFilterCurrentColumn(c);
                                setFilterCurrentDataType(dataType);
                                setFilterCurrentIndex(cIndex);

                                handleFilterPopupContent(c, dataType, cIndex);
                              }}
                            >
                              <Button
                                variant="borderless"
                                icon={{
                                  element: (
                                    <ARIcon
                                      viewBox="0 0 16 16"
                                      size={24}
                                      icon="Filter"
                                      fill="var(--dark)"
                                      strokeWidth={0}
                                    />
                                  ),
                                }}
                              />
                            </span>
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
                <React.Fragment key={index}>{renderRow(item, index, 1)}</React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <FilterPopup tableContent={_tableContent} coordinate={filterButtonCoordinate} buttons={_filterButton}>
          {filterPopupContent}
        </FilterPopup>

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
