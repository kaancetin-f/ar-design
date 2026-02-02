import React, { Dispatch, memo, SetStateAction } from "react";
import { TableColumnType } from "../../../libs/types";
import Button from "../../form/button";
import { ARIcon } from "../../icons";
import { ExtractKey } from "./Helpers";
import { Sort } from "./IProps";

const MemoizedTHeadCell = function <T>({
  open,
  sort,
  columns,
  propertiesButton,
  setSortCurrentColumn,
  setPropertiesButtonCoordinate,
}: {
  open: { get: boolean; set: Dispatch<SetStateAction<boolean>> };
  sort: {
    get: Sort<T>[];
    set: Dispatch<SetStateAction<Sort<T>[]>>;
  };
  columns: TableColumnType<T>[];
  propertiesButton: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  setSortCurrentColumn: React.Dispatch<React.SetStateAction<TableColumnType<T> | null>>;
  setPropertiesButtonCoordinate: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}) {
  return (
    <>
      {columns.map((c, cIndex) => {
        const _direction = sort.get.find((s) => s.key === c.key)?.direction;
        let _className: string[] = [];

        if (c.config?.sticky) _className.push(`sticky-${c.config.sticky}`);
        if (!c.config?.width) _className.push("min-w");
        if (c.config?.alignContent) {
          _className.push(`align-content-${c.config.alignContent}`);
        }

        return (
          <th
            key={`column-${cIndex}-${Math.random()}`}
            // key={`column-${typeof c.key == "object" ? c.key.field : c.key}`}
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
            <div>
              <span style={{ fontWeight: 500 }}>
                <span>
                  {_direction === "asc" && <ARIcon icon="ArrowUp" />}
                  {_direction === "desc" && <ARIcon icon="ArrowDown" />}
                </span>

                {c.title}
              </span>

              <span
                ref={(element) => (propertiesButton.current[cIndex] = element)}
                className="properties-field"
                onClick={(event) => {
                  event.stopPropagation();

                  const rect = event.currentTarget.getBoundingClientRect();
                  const screenCenterX = window.innerWidth / 2;
                  const coordinateX = rect.x > screenCenterX ? rect.x + rect.width - 225 : rect.x;
                  const coordinateY = rect.y + rect.height;

                  setSortCurrentColumn(c);
                  setPropertiesButtonCoordinate({
                    x: coordinateX,
                    y: coordinateY,
                  });

                  sort.set((prev) => {
                    const key = ExtractKey(c.key) as keyof T;
                    const index = prev.findIndex((s) => s.key === key);

                    if (index === -1) return [...prev, { key, direction: null }];

                    return prev;
                  });
                  open.set(true);
                }}
              >
                <Button
                  variant="borderless"
                  icon={{
                    element: <ARIcon size={16} icon="ThreeDotsVertical" fill="var(--dark)" strokeWidth={0} />,
                  }}
                />
              </span>
            </div>
          </th>
        );
      })}
    </>
  );
};

// React.memo kullanımı sırasında generic tipi koruyoruz.
const THeadCell = memo(MemoizedTHeadCell) as typeof MemoizedTHeadCell;

export default THeadCell;
