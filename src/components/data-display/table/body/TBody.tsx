"use client";

import React, { Dispatch, Fragment, memo, SetStateAction, useEffect, useRef, useState } from "react";
import { ARIcon } from "../../../icons";
import { TableColumnType } from "../../../../libs/types";
import Checkbox from "../../../form/checkbox";
import Editable from "./Editable";
import { Config } from "../IProps";
import { useTranslation } from "../../../../libs/core/application/hooks";

interface IProps<T extends object> {
  data: T[];
  columns: TableColumnType<T>[];
  refs: {
    _checkboxItems: React.MutableRefObject<(HTMLInputElement | null)[]>;
    _selectionItems: React.MutableRefObject<T[]>;
  };
  states: {
    setSelectAll: { get: boolean; set: Dispatch<SetStateAction<boolean>> };
    showSubitems: { get: { [key: string]: boolean }; set: Dispatch<React.SetStateAction<{ [key: string]: boolean }>> };
  };
  methods: {
    trackBy?: (item: T) => string;
    selections?: (selectionItems: T[]) => void;
    selectionDisabled?: (item: T) => boolean;
    onDnD?: (item: T[]) => void;
    onEditable?: (item: T, trackByValue: string, currentKey?: keyof T | null) => void;
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

interface ISubitemListProps<T> {
  items: T[];
  columns: TableColumnType<T>[];
  depth: number;
  level?: number;
  parentKey?: string;
  config: any;
  methods: any;
  states: any;
  renderCell: (args: IRenderCell<T>) => React.ReactNode;
}

// SubitemList bağımsız bir bileşen.
// Böylece her render döngüsünde hafızada sıfırdan yaratılıp alt DOM elementlerini çökertmiyor.
const SubitemList = <T extends object>({
  items,
  columns,
  depth,
  level = 1,
  parentKey = "",
  config,
  methods,
  states,
  renderCell,
}: ISubitemListProps<T>) => {
  const _subrowSelector = config.subrow?.selector ?? "subitems";
  const _subrowButton = config.subrow?.button ?? true;

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

  return (
    <>
      {items.map((subitem: T, subindex: number) => {
        const id = methods.trackBy?.(subitem) ?? `sub-${subindex}`;
        const key = `${parentKey}.${id}`;
        const _subitem = subitem[_subrowSelector as keyof typeof subitem];
        const isHasSubitems = _subrowSelector in subitem;

        return (
          <Fragment key={`subitem-wrapper-${key}`}>
            <tr className={`subrow-item ${_subrowButton ? "type-b" : "type-a"}`} data-level={level}>
              {isHasSubitems && _subrowButton ? (
                <td className="subrow-col sticky sticky-left" data-sticky-position="left">
                  <div className="subitem-open-button-wrapper">
                    <span
                      className={`${(states.showSubitems.get[key] && "opened") ?? ""} ${!_subitem && "passive"}`}
                      onClick={() => {
                        if (!_subitem) return;
                        states.showSubitems.set((prev: any) => ({ ...prev, [key]: !prev[key] }));
                      }}
                    />
                  </div>
                </td>
              ) : !isHasSubitems && _subrowButton ? (
                <td style={{ width: 0, minWidth: 0 }}></td>
              ) : null}

              {columns.map((column: TableColumnType<T>, cIndex: number) =>
                renderCell({
                  item: subitem,
                  column,
                  index: subindex,
                  cIndex,
                  depth: depth * (config.isTreeView ? 2.25 : 1.75),
                  level,
                  height: 0,
                  isSubrows: true,
                }),
              )}
            </tr>

            {states.showSubitems.get[key] && _subitem && (
              <SubitemList
                items={_subitem as T[]}
                columns={columns}
                depth={depth + 0.75}
                level={level + 1}
                parentKey={key}
                config={config}
                methods={methods}
                states={states}
                renderCell={renderCell}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

function TBody<T extends object>({ data, columns, refs, methods, states, config }: IProps<T>) {
  // refs
  const _tBodyTR = useRef<(HTMLTableRowElement | null)[]>([]);
  const _tHeadTH = useRef<(HTMLTableCellElement | null)[]>([]);

  // states
  const [triggerForRender, setTriggerForRender] = useState<boolean>(false);
  const [rowHeights, setRowHeights] = useState<number[]>([]);

  // variables
  const _subrowSelector: string = config.subrow?.selector ?? "subitems";
  const _subrowButton: boolean = config.subrow?.button ?? true;

  // hooks
  const { t } = useTranslation(String(config.locale ?? "tr"));

  // methods
  const renderCell = ({ item, column, index, cIndex, depth, level, height = 0, isSubrows = false }: IRenderCell<T>) => {
    let render: any;
    // const isHasSubitems = _subrowSelector in item;
    const itemTrackId = methods.trackBy?.(item) ?? index.toString();

    if (typeof column.key !== "object") render = column.render ? column.render(item) : item[column.key as keyof T];
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

    const firstCleanDataColumn = columns.find(
      (col) => col.config?.sticky === undefined || col.config?.sticky !== "left",
    );
    const isTargetPaddingColumn = firstCleanDataColumn !== undefined && column === firstCleanDataColumn;

    return (
      <td
        key={`cell-${itemTrackId}-${cIndex}`}
        className={_className.join(" ")}
        style={{
          ...(column.config?.sticky ? { height } : {}),
          ...(column.config?.width
            ? { width: column.config.width, minWidth: column.config.width, maxWidth: column.config.width }
            : {}),
        }}
        data-sticky-position={column.config?.sticky}
      >
        <div
          style={{
            paddingLeft: isTargetPaddingColumn ? `${depth == 0 ? 1 : depth}rem` : "",
          }}
          className="table-cell"
        >
          {config.isTreeView && cIndex === 0 && (
            <>
              {isSubrows &&
                Array.from({ length: level }).map((_, i) => (
                  <div
                    key={`last-before-${itemTrackId}-${i}`}
                    style={{ left: `${(i > 0 ? i * 1.655 : i) + 0.65}rem` }}
                    className="last-before"
                  ></div>
                ))}
              <div className="before"></div>
            </>
          )}
          {React.isValidElement(render) ? (
            render
          ) : column.editable && methods.onEditable ? (
            <Editable
              key={`editable-${itemTrackId}-${String(column.key)}`} // Benzersiz, zıplamayan hücre anahtarı
              c={column}
              item={item}
              trackByValue={itemTrackId}
              onEditable={methods.onEditable}
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

  const renderRow = (item: T, index: number, deph: number, parentKey = "") => {
    const id = methods.trackBy?.(item) ?? index.toString();
    const key = parentKey ? `${parentKey}.${id}` : id;
    const _subitem = item[_subrowSelector as keyof typeof item];
    const isHasSubitems = _subrowSelector in item;

    return (
      <Fragment key={`row-wrapper-${id}`}>
        <tr
          ref={(element) => {
            _tBodyTR.current[index] = element;
          }}
          {...(methods.rowBackgroundColor ? { style: { backgroundColor: methods.rowBackgroundColor(item) } } : {})}
          {...(methods.onDnD && data.length > 1 ? { className: "draggable", draggable: true } : {})}
        >
          {methods.selections && (
            <td
              ref={(element) => {
                _tHeadTH.current[index] = element;
              }}
              className="flex justify-content-center sticky sticky-left"
              data-sticky-position="left"
            >
              <Checkbox
                ref={(element) => {
                  if (element) refs._checkboxItems.current[index] = element;
                }}
                variant="filled"
                color="green"
                checked={refs._selectionItems.current.some(
                  (sItem) => methods.trackBy?.(sItem) === methods.trackBy?.(item),
                )}
                onChange={(event) => {
                  const rKey = methods.trackBy?.(item);
                  if (event.target.checked) {
                    if (!refs._selectionItems.current.some((_item) => methods.trackBy?.(_item) === rKey)) {
                      refs._selectionItems.current = [...refs._selectionItems.current, item];
                    }
                  } else {
                    refs._selectionItems.current = refs._selectionItems.current.filter(
                      (_item) => methods.trackBy?.(_item) !== rKey,
                    );
                  }
                  methods.selections?.(refs._selectionItems.current);
                  setTriggerForRender((prev) => !prev);
                }}
                disabled={methods.selectionDisabled?.(item)}
              />
            </td>
          )}

          {isHasSubitems && _subrowButton ? (
            <td className="subrow-col sticky sticky-left" data-sticky-position="left">
              <div className="subitem-open-button-wrapper">
                <span
                  className={`subitem-open-button ${(states.showSubitems.get[key] && "opened") ?? ""} ${!_subitem && "passive"}`}
                  onClick={() => {
                    states.showSubitems.set((prev) => ({ ...prev, [key]: !prev[key] }));
                  }}
                />
              </div>
            </td>
          ) : isHasSubitems && _subrowButton ? (
            <td style={{ width: 0, minWidth: 0 }}></td>
          ) : null}

          {columns.map((column, cIndex) =>
            renderCell({
              item,
              column,
              index,
              cIndex,
              depth: deph * (config.isTreeView ? 1.75 : 0),
              level: 0,
              height: rowHeights[index] ?? 0,
            }),
          )}
        </tr>

        {states.showSubitems.get[key] && _subitem && (
          <SubitemList
            items={_subitem as T[]}
            columns={columns}
            depth={1.5}
            parentKey={key}
            config={config}
            methods={methods}
            states={states}
            renderCell={renderCell}
          />
        )}
      </Fragment>
    );
  };

  // useEffects
  useEffect(() => {
    if (!data || data.length === 0) return;
    const heights = _tBodyTR.current.map((el) => (el ? el.getBoundingClientRect().height : 0));
    setRowHeights(heights);
  }, [data.length]);

  useEffect(() => {
    if (Array.isArray(refs._checkboxItems.current) && refs._checkboxItems.current.length > 0) {
      const allChecked = refs._checkboxItems.current.every((item) => item?.checked === true);
      states.setSelectAll.set(allChecked);
    }
  }, [triggerForRender]);

  return data.length > 0 ? (
    data.map((item, index) => {
      const rowKey = methods.trackBy?.(item) ?? index.toString();
      return <React.Fragment key={`tbody-row-${rowKey}`}>{renderRow(item, index, 1)}</React.Fragment>;
    })
  ) : (
    <tr>
      <td colSpan={columns.length || 1}>
        <div className="no-item">
          <ARIcon icon={"Inbox-Fill"} fill="var(--gray-300)" size={64} style={{ position: "relative", zIndex: 1 }} />
          <span>{t("Table.Body.NoData.Text")}</span>
        </div>
      </td>
    </tr>
  );
}

export default memo(TBody) as <T extends object>(props: IProps<T>) => React.JSX.Element;
