import React from "react";
import { TableColumnType } from "../../../libs/types";

const MemoizedTHeadCell = function <T>({ columns }: { columns: TableColumnType<T>[] }) {
  return (
    <>
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
            <span style={{ fontWeight: 500 }}>{c.title}</span>
          </th>
        );
      })}
    </>
  );
};

// 👇 React.memo kullanımı sırasında generic tipi koruyoruz
const THeadCell = React.memo(MemoizedTHeadCell) as typeof MemoizedTHeadCell;

export default THeadCell;
