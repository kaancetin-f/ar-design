"use client";

import React, {
  Dispatch,
  memo,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import { ARIcon } from "../../icons";
import { TableColumnType } from "../../../libs/types";
import { ExtractKey } from "./Helpers";
import { Sort } from "./IProps";

interface IProps<T> {
  open: { get: boolean; set: Dispatch<SetStateAction<boolean>> };
  sort: {
    get: Sort<T>[];
    set: Dispatch<SetStateAction<Sort<T>[]>>;
    currentColumn: TableColumnType<T> | null;
  };
  tableContent: MutableRefObject<HTMLDivElement | null>;
  coordinate: { x: number; y: number };
  buttons: MutableRefObject<(HTMLSpanElement | null)[]>;
}

function PropertiesPopup<T extends object>({ open, sort, tableContent, coordinate, buttons }: IProps<T>) {
  // refs
  const _arTablePropertiesPopup = useRef<HTMLDivElement>(null);

  // methods
  const handleClickOutSide = useCallback(() => {
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedInsidePopup = _arTablePropertiesPopup.current && _arTablePropertiesPopup.current.contains(target);
      const isOneOfButtons = buttons.current.some((button) => button === target || button?.contains(target));

      if (!clickedInsidePopup && !isOneOfButtons) handleClose();
    };
  }, []);

  const handleSort = useMemo(() => {
    return (columnKey: keyof T | null, direction: "asc" | "desc") => {
      if (!columnKey) return;

      sort.set((prev) => {
        const index = prev.findIndex((s) => s.key === columnKey);

        if (index !== -1) return [{ key: columnKey, direction }];

        return [{ key: columnKey, direction }];
      });
    };
  }, []);

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") open.set(false);
  };

  const handleOpen = () => open.set(true);

  const handleClose = () => open.set(false);

  // useEffects
  useEffect(() => {
    buttons.current.map((button) => {
      if (button) button.addEventListener("click", handleOpen);
    });

    return () => {
      buttons.current.map((button) => {
        if (button) button.removeEventListener("click", handleOpen);
      });
    };
  }, [buttons]);

  useEffect(() => {
    const firstFilterButton = buttons.current[0];

    if (firstFilterButton) {
      const rect = firstFilterButton.getBoundingClientRect();

      coordinate.x = rect.left;
      coordinate.y = rect.top + rect.height;
    }

    if (tableContent.current) {
      tableContent.current.addEventListener("scroll", handleClose);
    }

    document.addEventListener("click", handleClickOutSide);
    document.addEventListener("keydown", handleKeys);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
      document.removeEventListener("keydown", handleKeys);

      if (tableContent.current) {
        tableContent.current.removeEventListener("scroll", handleClose);
      }
    };
  }, []);

  const currentKey = ExtractKey(sort.currentColumn?.key);
  const currentSort = sort.get?.find((s) => s.key === currentKey);

  return (
    open.get &&
    ReactDOM.createPortal(
      <div
        ref={_arTablePropertiesPopup}
        className="ar-table-properties-popup"
        style={{ top: coordinate.y, left: coordinate.x }}
      >
        <ul>
          {/* ASC */}
          {currentSort && (!currentSort.direction || currentSort.direction === "desc") && (
            <li onClick={() => handleSort(currentKey, "asc")}>
              <span>
                <ARIcon icon="ArrowUp" />
              </span>
              <span>Sort Ascending</span>
            </li>
          )}

          {/* DESC */}
          {currentSort && (!currentSort.direction || currentSort.direction === "asc") && (
            <li onClick={() => handleSort(currentKey, "desc")}>
              <span>
                <ARIcon icon="ArrowDown" />
              </span>
              <span>Sort Descending</span>
            </li>
          )}

          {/* CLEAR */}
          {currentSort && currentSort.direction && (
            <li
              onClick={() => {
                sort.set((prev) => prev.filter((s) => s.key !== currentKey));
                open.set(false);
              }}
            >
              <span>
                <ARIcon icon="ChevronExpand" />
              </span>
              <span>Clear Sort</span>
            </li>
          )}
        </ul>
      </div>,
      document.body,
    )
  );
}

export default memo(PropertiesPopup) as typeof PropertiesPopup;
