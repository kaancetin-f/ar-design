"use client";

import "../../../assets/css/components/data-display/table/styles.css";
import { ARIcon } from "../../icons";
import Button from "../../form/button";
import Checkbox from "../../form/checkbox";
import IProps, { FilterValue, SearchedParam, Sort } from "./IProps";
import Pagination from "../../navigation/pagination";
import React, {
  ChangeEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HTMLTableElementWithCustomAttributes, Option, TableColumnType } from "../../../libs/types";
import Input from "../../form/input";
import Utils from "../../../libs/infrastructure/shared/Utils";
import FilterPopup from "./FilterPopup";
import { FilterOperator } from "../../../libs/infrastructure/shared/Enums";
import Select from "../../form/select";
import Grid from "../grid-system";
import THeadCell from "./THeadCell";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import PropertiesPopup from "./PropertiesPopup";
import { ExtractKey } from "./Helpers";
import Header from "./header/Header";
import TBody from "./body/TBody";

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
      trackBy,
      title,
      description,
      data,
      columns,
      actions,
      rowBackgroundColor,
      selections,
      previousSelections,
      sortedParams,
      searchedParams,
      onEditable,
      onDnD,
      pagination,
      config = { isSearchable: false },
    }: IProps<T>,
    ref: React.ForwardedRef<HTMLTableElementWithCustomAttributes>,
  ) => {
    // refs
    const _innerRef = useRef<HTMLTableElementWithCustomAttributes>(null);
    const _tableWrapper = useRef<HTMLDivElement>(null);
    const _tableContent = useRef<HTMLDivElement>(null);
    const _tBody = useRef<HTMLTableSectionElement>(null);
    const _dragItem = useRef<HTMLElement>();
    const _checkboxItems = useRef<(HTMLInputElement | null)[]>([]);
    const _filterCheckboxItems = useRef<(HTMLInputElement | null)[]>([]);
    // refs -> Search
    const _searchTextInputs = useRef<(HTMLInputElement | null)[]>([]);
    const _searchTimeOut = useRef<NodeJS.Timeout | null>(null);
    // refs -> Properties
    const _propertiesButton = useRef<(HTMLSpanElement | null)[]>([]);
    // refs -> Filter
    const _filterButton = useRef<(HTMLSpanElement | null)[]>([]);
    // refs -> Selection
    const _selectionItems = useRef<T[]>([]);
    const lastSentRef = useRef<T[]>([]);

    // variables
    const _subrowOpenAutomatically: boolean = config.subrow?.openAutomatically ?? false;
    const _subrowSelector: string = config.subrow?.selector ?? "subitems";
    const _subrowButton: boolean = config.subrow?.button ?? true;

    // className
    const _tableClassName: string[] = ["ar-table", "scroll"];

    // states
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [showSubitems, setShowSubitems] = useState<{ [key: string]: boolean }>({});
    // states -> Search
    const [searchedText, setSearchedText] = useState<SearchedParam | null>(null);
    const [_searchedParams, setSearchedParams] = useState<SearchedParam | null>(null);
    const [checkboxSelectedParams, setCheckboxSelectedParams] = useState<SearchedParam | null>(null);
    // states -> Sort
    const [sortConfig, setSortConfig] = useState<Sort<T>[]>([]);
    const [sortCurrentColumn, setSortCurrentColumn] = useState<TableColumnType<T> | null>(null);
    // states -> Properties
    const [openProperties, setOpenProperties] = useState<boolean>(false);
    const [propertiesButtonCoordinate, setPropertiesButtonCoordinate] = useState<{ x: number; y: number }>({
      x: 0,
      y: 0,
    });
    // states -> Filter
    const [filterButtonCoordinate, setFilterButtonCoordinate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [filterPopupContent, setFilterPopupContent] = useState<JSX.Element | null>(null);
    const [filterPopupOption, setFilterPopupOption] = useState<{ key: string; option: Option | undefined } | null>(
      null,
    );
    const [filterPopupOptionSearchText, setFilterPopupOptionSearchText] = useState<string | null>(null);
    // states -> Filter Fields Backup
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [filterCurrentColumn, setFilterCurrentColumn] = useState<TableColumnType<T> | null>(null);
    const [filterCurrentDataType, setFilterCurrentDataType] = useState<
      "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | null
    >(null);
    const [filterCurrentIndex, setFilterCurrentIndex] = useState<number | null>(null);
    // states -> Pagination
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedPerPage, setSelectedPerPage] = useState<number>(pagination?.perPage ?? 10);
    // states -> Mobil
    const [isMobile, setIsMobile] = useState(false);

    // hooks
    // Dışarıdan gelen ref'i _innerRef'e bağla.
    useImperativeHandle(ref, () => _innerRef.current as HTMLTableElementWithCustomAttributes);

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

    const handleResize = useMemo(() => {
      return (_: UIEvent) => {
        setIsMobile(window.innerWidth <= 768);
      };
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

            if (pagination) pagination.onChange?.(1, selectedPerPage);
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
      [filterPopupOption],
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
      index: number | null,
    ) => {
      const key: keyof T | null = ExtractKey(c.key);

      if (!key) return;

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
                        (x) => x.value === filterPopupOption?.option?.value && filterPopupOption.key === c.key,
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
                      filter.text.toLocaleLowerCase().includes(filterPopupOptionSearchText?.toLocaleLowerCase() ?? ""),
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

      // Sorting...
      if (sortConfig.length > 0 && !config.isServerSide) {
        _data.sort((a, b) => {
          for (const config of sortConfig) {
            const aValue = a[config.key];
            const bValue = b[config.key];

            if (aValue < bValue) return config.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return config.direction === "asc" ? 1 : -1;
          }
          return 0;
        });
      }

      if (pagination && !config.isServerSide) {
        const indexOfLastRow = currentPage * selectedPerPage;
        const indexOfFirstRow = indexOfLastRow - selectedPerPage;

        _data = _data.slice(indexOfFirstRow, indexOfLastRow);
      }

      return _data;
    }, [data, searchedText, currentPage, selectedPerPage, sortConfig]);

    // useEffects
    useEffect(() => {
      if (!previousSelections || previousSelections.length === 0) {
        _selectionItems.current = [];
        return;
      }

      const validSelections = data.filter((item) =>
        previousSelections.some((selected) => trackBy?.(selected) === trackBy?.(item)),
      );

      // Gereksiz overwrite’i engelle.
      if (!Utils.DeepEqual(_selectionItems.current, validSelections)) {
        _selectionItems.current = validSelections;
      }
    }, [previousSelections, data, trackBy]);

    useEffect(() => {
      if (config?.isServerSide && sortedParams) {
        const sortRecord: Record<string, string> = {};

        sortConfig?.forEach((s) => {
          if (s.direction) sortRecord[String(s.key)] = s.direction;
        });

        const query = new URLSearchParams(sortRecord);

        sortedParams(sortConfig ?? [], query.toString());
      }
    }, [sortConfig]);

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
      if (pagination) pagination.onChange?.(1, selectedPerPage);
    }, [checkboxSelectedParams]);

    useEffect(() => {
      if (typeof selections !== "function") return;

      const payload = _selectionItems.current.map((item) => ({
        ...item,
        trackByValue: trackBy?.(item),
      }));

      if (!Utils.DeepEqual(payload, lastSentRef.current)) {
        lastSentRef.current = payload;
        selections(payload);
      }
    }, [selections, trackBy]);

    useEffect(() => {
      // Filter Content alanı re-render işlemi.
      if (filterCurrentColumn && filterCurrentDataType) {
        handleFilterPopupContent(filterCurrentColumn, filterCurrentDataType, filterCurrentIndex);
      }
    }, [checkboxSelectedParams, filterPopupOption, filterPopupOptionSearchText]);

    useLayoutEffect(() => {
      // @DND
      if (!onDnD || !_tBody.current || data.length === 0) return;

      _tBody.current.childNodes.forEach((item) => {
        const _item = item as HTMLElement;

        // Events
        _item.ondragstart = (event) => {
          const dragItem = event.currentTarget as HTMLElement;

          _dragItem.current = dragItem;
          dragItem.classList.add("drag-item");

          if (event.dataTransfer) {
            // 1. Geçici bir kapsayıcı oluştur
            const shadowContainer = document.createElement("div");
            shadowContainer.style.position = "absolute";
            shadowContainer.style.top = "-9999px";
            shadowContainer.style.left = "-9999px";
            document.body.appendChild(shadowContainer);

            if (config.dnd?.renderItem) {
              // 2a. React Node varsa: createRoot ile render et
              const root = createRoot(shadowContainer);

              // flushSync kullanıyoruz çünkü setDragImage çağrılmadan önce
              // DOM'un hemen güncellenmesi gerekiyor.
              flushSync(() => {
                root.render(config.dnd?.renderItem);
              });
            } else {
              // 2b. React Node yoksa: Varsayılan HTML string
              shadowContainer.innerHTML = `
                <div class="ar-dnd-shadow" style="background: white; padding: 10px; border: 1px solid #ccc;">
                  <i class="bi bi-gear-wide-connected"></i>
                  <span>Dragging...</span>
                </div>
              `;
            }

            // 3. Tarayıcıya bu elementi sürükleme görseli yapmasını söyle
            // (0, 0) koordinatları mouse'un görselin neresinde duracağını belirler
            event.dataTransfer.setDragImage(shadowContainer, 20, 20);

            // 4. Temizlik: Görsel hafızaya alındıktan sonra DOM'dan kaldırabiliriz
            // Bir sonraki event loop'ta silmek en güvenlisidir
            setTimeout(() => {
              document.body.removeChild(shadowContainer);
            }, 0);
          }
        };

        _item.ondragover = (event) => {
          event.preventDefault();

          const overItem = event.currentTarget as HTMLElement;
          const rect = overItem.getBoundingClientRect();

          // Otomatik scroll.
          if (rect.top < 250) window.scrollBy(0, -20);
          if (rect.bottom > window.innerHeight - 150) window.scrollBy(0, 20);

          // Gerçek taşıma işlemi.
          if (_dragItem.current !== overItem) {
            if (_tBody.current && _dragItem.current) {
              const dragItemIndex = [..._tBody.current.children].indexOf(_dragItem.current!);
              const dropItemIndex = [..._tBody.current.children].indexOf(overItem);

              if (dragItemIndex === -1 || dropItemIndex === -1) return;

              _tBody.current.insertBefore(
                _dragItem.current,
                dragItemIndex < dropItemIndex ? overItem.nextSibling : overItem,
              );

              const movedItem = data.splice(dragItemIndex, 1)[0];

              if (movedItem) {
                data.splice(dropItemIndex, 0, movedItem);
                onDnD?.(data);
              }
            }
          }
        };

        _item.ondragend = (event) => {
          const item = event.currentTarget as HTMLElement;
          item.classList.remove("drag-item");
          item.classList.add("end-item");

          setTimeout(() => {
            item.classList.remove("end-item");

            if (item.classList.length === 0) item.removeAttribute("class");
          }, 1000);
        };
      });

      _tBody.current.ondragover = (event) => event.preventDefault();

      return () => {
        if (!_tBody.current) return;

        _tBody.current.childNodes.forEach((item) => {
          const _item = item as HTMLElement;

          _item.ondragstart = null;
          _item.ondragover = null;
          _item.ondragend = null;
        });

        _tBody.current.ondragover = null;
      };
    }, [data]);

    useLayoutEffect(() => handleScroll(), [data]);

    useLayoutEffect(() => {
      if (!pagination?.currentPage) return;

      setTimeout(() => handleScroll(), 0);
      setCurrentPage(pagination?.currentPage ?? 1);
    }, [pagination?.currentPage]);

    useLayoutEffect(() => {
      setCurrentPage(1);
      setTimeout(() => handleScroll(), 0);
    }, [selectedPerPage]);

    useEffect(() => {
      setIsMobile(window.innerWidth <= 768);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <div ref={_tableWrapper} className={_tableClassName.map((c) => c).join(" ")}>
        {(title || description || actions || React.Children.count(children) > 0) && (
          <Header title={title} description={description} actions={actions} />
        )}

        <div ref={_tableContent} className="content" onScroll={handleScroll}>
          <table ref={_innerRef}>
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

                <THeadCell
                  open={{ get: openProperties, set: setOpenProperties }}
                  sort={{ get: sortConfig, set: setSortConfig }}
                  columns={columns}
                  propertiesButton={_propertiesButton}
                  setSortCurrentColumn={setSortCurrentColumn}
                  setPropertiesButtonCoordinate={setPropertiesButtonCoordinate}
                />
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
                                setOpenFilter(true);

                                handleFilterPopupContent(c, dataType, cIndex);
                              }}
                            >
                              <Button
                                variant="borderless"
                                icon={{
                                  element: <ARIcon size={24} icon="Filter" fill="var(--dark)" strokeWidth={0} />,
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

            <tbody ref={_tBody}>
              <TBody
                data={getData}
                columns={columns}
                states={{ showSubitems: { get: showSubitems, set: setShowSubitems } }}
                methods={{
                  trackBy: trackBy,
                  selections: selections,
                  onDnD: onDnD,
                  onEditable: onEditable,
                  rowBackgroundColor: rowBackgroundColor,
                }}
                config={config}
              />
            </tbody>
          </table>
        </div>

        <FilterPopup
          refs={{
            tableContent: _tableContent,
            buttons: _filterButton,
          }}
          states={{
            open: { get: openFilter, set: setOpenFilter },
          }}
          coordinate={filterButtonCoordinate}
        >
          {filterPopupContent}
        </FilterPopup>

        <PropertiesPopup
          refs={{
            tableContent: _tableContent,
            buttons: _propertiesButton,
          }}
          states={{
            open: { get: openProperties, set: setOpenProperties },
            sort: { get: sortConfig, set: setSortConfig, currentColumn: sortCurrentColumn },
          }}
          coordinate={propertiesButtonCoordinate}
        />

        {pagination && (
          <div className="footer">
            <span>
              {isMobile ? (
                <>
                  <strong>
                    {(currentPage - 1) * selectedPerPage + 1} -{" "}
                    {Math.min(currentPage * selectedPerPage, pagination.totalRecords || getData.length)} of{" "}
                    {pagination.totalRecords || getData.length}
                  </strong>
                </>
              ) : (
                <>
                  <strong>
                    Showing {(currentPage - 1) * selectedPerPage + 1} to{" "}
                    {Math.min(currentPage * selectedPerPage, pagination.totalRecords || getData.length)}
                  </strong>{" "}
                  <span>of {pagination.totalRecords || getData.length} agreements</span>
                </>
              )}
            </span>

            <Pagination
              totalRecords={config.isServerSide ? pagination.totalRecords : (totalRecords ?? 0)}
              currentPage={currentPage}
              perPage={selectedPerPage}
              onChange={(currentPage, perPage) => {
                setCurrentPage(currentPage);
                setSelectedPerPage(perPage);
                pagination.onChange?.(currentPage, perPage);

                setTimeout(() => handleScroll(), 0);
              }}
            />
          </div>
        )}
      </div>
    );
  },
);

export default memo(Table, <T extends object>(prevProps: IProps<T>, nextProps: IProps<T>) => {
  const data = Utils.DeepEqual(prevProps.data, nextProps.data);
  const columns = Utils.DeepEqual(prevProps.columns, nextProps.columns);
  const actions = Utils.DeepEqual(prevProps.actions, nextProps.actions);
  const previousSelections = Utils.DeepEqual(prevProps.previousSelections, nextProps.previousSelections);
  const pagination = Utils.DeepEqual(prevProps.pagination, nextProps.pagination);

  return data && columns && actions && previousSelections && pagination;
}) as <T extends object>(props: IProps<T> & { ref?: React.Ref<HTMLTableElement> }) => JSX.Element;
