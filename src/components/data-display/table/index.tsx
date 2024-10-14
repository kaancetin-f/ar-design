import React, { useEffect, useRef } from "react";
import IProps from "./IProps";
import "../../../assets/css/components/data-display/table/table.css";

const Table = function <T>({ data, columns, config }: IProps<T>) {
  // refs
  const _tableWrapper = useRef<HTMLDivElement>(null);
  const _table = useRef<HTMLTableElement>(null);
  // className
  const _tableClassName: string[] = ["ar-table", "scroll"];

  if (config && Object.keys(config.scroll || {}).length > 0) {
    if (_tableWrapper.current && config.scroll) {
      if (config.scroll.maxHeight) {
        _tableWrapper.current.style.maxHeight = `${config?.scroll?.maxHeight}rem`;
      }
    }
  }

  // methods
  const handleOnScroll = () => {
    if (!_table.current) return;

    const wrapperRect = _tableWrapper.current?.getBoundingClientRect();

    const updateStickyPositions = (elements: NodeListOf<HTMLTableRowElement>) => {
      elements.forEach((element) => {
        const leftChildren = Array.from(element.childNodes)
          .filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)
          .filter((child) => child.dataset.stickyPosition === "left");
        const rightChildren = Array.from(element.childNodes)
          .filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)
          .filter((child) => child.dataset.stickyPosition === "right")
          .reverse();

        // #region Left
        const leftPrevious = leftChildren.map((child, index) => {
          const rect = child.getBoundingClientRect();

          if (child.nodeName === "TD") child.style.zIndex = `${leftChildren.length - index - 1}`;

          return Math.abs(rect.right - (wrapperRect?.left || 0));
        });

        leftChildren.forEach((child, index) => {
          if (index > 0) {
            const x = leftChildren[index].getBoundingClientRect().left - Number(wrapperRect?.left);
            const y = leftPrevious[index - 1];

            if (x === y) child.classList.add("active-sticky");
            else child.classList.remove("active-sticky");

            child.style.left = `${y}px`;
          } else {
            child.classList.add("sticky");
          }
        });
        // #endregion

        // #region Right
        const rightPrevious = rightChildren.map((child) => {
          const rect = child.getBoundingClientRect();

          return Math.abs(rect.left - (wrapperRect?.right || 0));
        });

        rightChildren.forEach((child, index) => {
          if (index > 0) {
            const x = Math.abs(
              rightChildren[index].getBoundingClientRect().right - Number(wrapperRect?.right)
            );
            const y = rightPrevious[index - 1];

            if (x === y) child.classList.add("active-sticky");
            else child.classList.remove("active-sticky");

            child.style.right = `${y}px`;
          } else {
            child.classList.add("sticky");
          }
        });
        // #endregion
      });
    };

    const theadElements = _table.current.querySelectorAll<HTMLTableRowElement>("thead > tr");
    const tbodyElements = _table.current.querySelectorAll<HTMLTableRowElement>("tbody > tr");

    updateStickyPositions(theadElements);
    updateStickyPositions(tbodyElements);
  };

  // useEffects
  useEffect(handleOnScroll, [_table.current]);

  return (
    <div
      ref={_tableWrapper}
      className={_tableClassName.map((c) => c).join(" ")}
      onScroll={handleOnScroll}
    >
      <table ref={_table}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key as string}
                {...(c.config?.sticky && {
                  className: `sticky-${c.config.sticky}`,
                  "data-sticky-position": c.config.sticky,
                })}
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((c, _c_index) => {
                const render = c.render ? c.render(item) : item[c.key as keyof T];

                let isTypeOfNumber = typeof render == "number" ? "type-of-number" : "";

                return (
                  <td
                    key={c.key as string}
                    {...(c.config?.sticky && {
                      className: `sticky-${c.config.sticky} ${isTypeOfNumber}`,
                      "data-sticky-position": c.config.sticky,
                    })}
                  >
                    {React.isValidElement(render) ? render : String(render)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
