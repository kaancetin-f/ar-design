import React, { Dispatch, Fragment, memo, SetStateAction, useEffect, useRef, useState } from "react";
import { ARIcon } from "../../../icons";
import { TableColumnType } from "../../../../libs/types";
import Checkbox from "../../../form/checkbox";
import Editable from "./Editable";
import { Config } from "../IProps";

interface IProps<T> {
  data: T[];
  columns: TableColumnType<T>[];
  refs: {
    _checkboxItems: React.MutableRefObject<(HTMLInputElement | null)[]>;
    _selectionItems: React.MutableRefObject<T[]>;
  };
  states: {
    setSelectAll: {
      get: boolean;
      set: Dispatch<SetStateAction<boolean>>;
    };
    showSubitems: {
      get: {
        [key: string]: boolean;
      };
      set: Dispatch<
        React.SetStateAction<{
          [key: string]: boolean;
        }>
      >;
    };
  };
  methods: {
    trackBy?: (item: T) => string;
    selections?: (selectionItems: T[]) => void;
    onDnD?: (item: T[]) => void;
    onEditable?: (item: T, trackByValue: string) => void;
    rowBackgroundColor?: (item: T) => string;
  };

  config: Config<T>;
}

interface IRenderCell<T> {
  item: T;
  column: TableColumnType<T>;
  index: number;
  cIndex: number;
  depth: number;
  level: number;
  height?: number;
  isSubrows?: boolean;
}

function TBody<T extends object>({ data, columns, refs, methods, states, config }: IProps<T>) {
  // refs
  const _hasMeasured = useRef<boolean>(false);
  const _tBodyTR = useRef<(HTMLTableRowElement | null)[]>([]);

  // states
  const [triggerForRender, setTriggerForRender] = useState<boolean>(false);
  const [rowHeights, setRowHeights] = useState<number[]>([]);

  // variables
  const _subrowSelector: string = config.subrow?.selector ?? "subitems";
  const _subrowButton: boolean = config.subrow?.button ?? true;

  // methods
  const renderRow = (item: T, index: number, deph: number) => {
    const isHasSubitems = _subrowSelector in item;

    return (
      <Fragment key={`row-${index}`}>
        <tr
          ref={(element) => {
            _tBodyTR.current[index] = element;
          }}
          {...(methods.rowBackgroundColor ? { style: { backgroundColor: methods.rowBackgroundColor(item) } } : {})}
          {...(methods.onDnD && data.length > 1 ? { className: "draggable", draggable: true } : {})}
        >
          {/* Checkboxes */}
          {methods.selections && (
            <td className="flex justify-content-center sticky-left" data-sticky-position="left">
              <Checkbox
                key={Date.now()}
                ref={(element) => (refs._checkboxItems.current[index] = element)}
                variant="filled"
                color="green"
                checked={refs._selectionItems.current.some(
                  (selectionItem) => methods.trackBy?.(selectionItem) === methods.trackBy?.(item),
                )}
                onChange={(event) => {
                  const key = methods.trackBy?.(item);

                  if (event.target.checked) {
                    if (!refs._selectionItems.current.some((_item) => methods.trackBy?.(_item) === key)) {
                      refs._selectionItems.current = [...refs._selectionItems.current, item];
                    }
                  } else {
                    refs._selectionItems.current = refs._selectionItems.current.filter(
                      (_item) => methods.trackBy?.(_item) !== key,
                    );
                  }

                  methods.selections?.(refs._selectionItems.current);
                  setTriggerForRender((prev) => !prev);
                }}
              />
            </td>
          )}

          {isHasSubitems && _subrowButton ? (
            <td>
              {item[_subrowSelector as keyof typeof item] && (
                <div className="subitem-open-button-wrapper">
                  <span
                    className={`subitem-open-button ${(states.showSubitems.get[index] && "opened") ?? ""}`}
                    onClick={() => {
                      states.showSubitems.set((prev) => ({
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

          {columns.map((column, cIndex) => {
            return renderCell({
              item,
              column,
              index,
              cIndex,
              depth: deph * (config.isTreeView ? 1.75 : 0),
              level: 0,
              height: rowHeights[index] ?? 0,
            });
          })}
        </tr>

        {/* Alt satırları burada listele */}
        {states.showSubitems.get[index] && item[_subrowSelector as keyof typeof item] && (
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

  const renderCell = ({ item, column, index, cIndex, depth, level, height = 0, isSubrows = false }: IRenderCell<T>) => {
    let render: any;

    // `column.key` bir string ise
    if (typeof column.key !== "object") render = column.render ? column.render(item) : item[column.key as keyof T];
    // `column.key` bir nesne ise ve `nestedKey` mevcutsa
    else if (typeof column.key === "object") {
      const _item = item[column.key.field as keyof T];

      if (_item && typeof _item === "object") {
        render = column.render ? column.render(item) : _item[column.key.nestedKey as keyof typeof _item];
      }
    } else render = null;

    const _className: string[] = [];

    if (column.config?.alignContent) _className.push(`align-content-${column.config.alignContent}`);
    if (column.config?.sticky) _className.push(`sticky-${column.config.sticky}`);
    if (column.config?.textWrap) _className.push(`text-${column.config.textWrap}`);

    return (
      <td
        key={`cell-${index}-${cIndex}`}
        className={_className.join(" ")}
        style={{
          ...(column.config?.sticky ? { height } : {}),
          ...(column.config?.width
            ? { width: column.config.width, minWidth: column.config.width, maxWidth: column.config.width }
            : {}),
        }}
        data-sticky-position={column.config?.sticky}
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
          {React.isValidElement(render) ? (
            render
          ) : column.editable && methods.onEditable ? (
            <Editable
              c={column}
              item={item}
              trackByValue={methods.trackBy?.(item) ?? ""}
              onEditable={methods.onEditable}
              validation={config.validation}
              config={config}
            />
          ) : (
            <span>{render}</span>
          )}
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
    if (config.subrow?.render) {
      return (
        <tr className={`subrow-item ${_subrowButton ? "type-b" : "type-a"}`} data-level={level}>
          {_subrowButton && <td style={{ ...config.subrow.render.styles, width: 0, minWidth: 0 }}></td>}

          <td colSpan={columns.length || 1} style={{ ...config.subrow.render.styles, padding: "7.5px 7.5px 7.5px 0" }}>
            {config.subrow?.render.element(items) ?? <></>}
          </td>
        </tr>
      );
    }

    return items.map((subitem: T, subindex: number) => {
      const _subitem = subitem[_subrowSelector as keyof typeof subitem];
      const isHasSubitems = _subrowSelector in subitem;

      return (
        <Fragment key={`subitem-${index}-${subindex}-${Math.random()}`}>
          <tr className={`subrow-item ${_subrowButton ? "type-b" : "type-a"}`} data-level={level}>
            {isHasSubitems && _subrowButton ? (
              <td>
                <div className="subitem-open-button-wrapper">
                  <span
                    className={`${(states.showSubitems.get[`${index}.${subindex}`] && "opened") ?? ""} ${!_subitem && "passive"}`}
                    onClick={() => {
                      if (!_subitem) return;

                      states.showSubitems.set((prev) => ({
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

            {!config.subrow?.render ? (
              columns.map((column: TableColumnType<T>, cIndex: number) =>
                renderCell({
                  item: subitem,
                  column,
                  index,
                  cIndex,
                  depth: depth * (config.isTreeView ? 2.25 : 1.75),
                  level,
                  height: 0,
                  isSubrows: true,
                }),
              )
            ) : (
              <td colSpan={columns.length || 1}>{config.subrow?.render.element(items) ?? <></>}</td>
            )}
          </tr>

          {states.showSubitems.get[`${index}.${subindex}`] && _subitem && (
            <SubitemList
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
    if (_hasMeasured.current) return;
    if (!data || data.length === 0) return;

    const heights = _tBodyTR.current.map((el) => (el ? el.getBoundingClientRect().height : 0));

    setRowHeights(heights);
    setTriggerForRender((prev) => !prev);
    _hasMeasured.current = true;
  }, [data]);

  useEffect(() => {
    if (Array.isArray(refs._checkboxItems.current) && refs._checkboxItems.current.length > 0) {
      const allChecked = refs._checkboxItems.current.every((item) => item?.checked === true);

      states.setSelectAll.set(allChecked);
    }
  }, [triggerForRender]);

  return data.length > 0 ? (
    data.map((item, index) => <React.Fragment key={index}>{renderRow(item, index, 1)}</React.Fragment>)
  ) : (
    <tr>
      <td colSpan={columns.length || 1}>
        <div className="no-item">
          <ARIcon icon={"Inbox-Fill"} fill="var(--gray-300)" size={64} style={{ position: "relative", zIndex: 1 }} />

          <span>No Data</span>
        </div>
      </td>
    </tr>
  );
}

export default memo(TBody) as typeof TBody;
