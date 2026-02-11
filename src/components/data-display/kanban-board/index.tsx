"use client";

import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import { KanbanBoardColumnType } from "../../../libs/types";
import "../../../assets/css/components/data-display/kanban-board/styles.css";
import DnD from "../dnd";
import { ARIcon } from "../../icons";
import Filter from "./filter";

const KanbanBoard = function <T, TColumnProperties>({
  trackBy,
  columns,
  onChange,
  config,
}: IProps<T, TColumnProperties>) {
  // refs
  const _kanbanWrapper = useRef<HTMLDivElement>(null);
  const _hoverItemIndex = useRef<number | null>(null);
  const _scrollInterval = useRef<number | null>(null);
  const _scrollAnimationFrame = useRef<number | null>(null);
  const _scrollSpeedRef = useRef(0); // px/frame

  // states
  const [data, setData] = useState<KanbanBoardColumnType<T, TColumnProperties>[]>([]);
  // states -> Filters
  const [search, setSearch] = useState<string>("");
  const [selectFilters, setSelectFilters] = useState<{
    [k: string]: (string | null)[];
  }>({});
  const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string | null>>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { from: Date | null; to: Date | null }>>({});

  // methods
  const handleBoardDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    const kanbanWrapper = _kanbanWrapper.current;

    if (!kanbanWrapper) return;

    const rect = kanbanWrapper.getBoundingClientRect();
    const mouseX = event.clientX;

    const edgeThreshold = 100; // px olarak kenar hassasiyeti.

    if (mouseX - rect.left < edgeThreshold) {
      // sol kenara yaklaştı.
      _scrollSpeedRef.current = -Math.max(1, (edgeThreshold - (mouseX - rect.left)) / 2);
    } else if (rect.right - mouseX < edgeThreshold) {
      // sağ kenara yaklaştı.
      _scrollSpeedRef.current = Math.max(1, (edgeThreshold - (rect.right - mouseX)) / 2);
    } else {
      _scrollSpeedRef.current = 0;
    }

    if (!_scrollAnimationFrame.current) {
      const scrollLoop = () => {
        if (kanbanWrapper && _scrollSpeedRef.current !== 0) {
          kanbanWrapper.scrollLeft += _scrollSpeedRef.current;
        }
        _scrollAnimationFrame.current = requestAnimationFrame(scrollLoop);
      };
      scrollLoop();
    }
  };

  const handleDrop = (toColumn: string) => (event: React.DragEvent) => {
    event.preventDefault();

    const item = JSON.parse(event.dataTransfer.getData("item"));
    const fromColumn = event.dataTransfer.getData("fromColumn");

    const nodes = document.querySelectorAll("[data-id='placeholder']");
    nodes.forEach((node) => node.remove());

    if (!item || fromColumn === toColumn) return;

    const updatedColumns = data.map((board) => {
      if (board.key === fromColumn) {
        return {
          ...board,
          items: board.items.filter((_item: T) => trackBy(_item) !== trackBy(item)),
        };
      }

      if (board.key === toColumn) {
        const boardItems = [...board.items];
        const safeIndex = Math.min(_hoverItemIndex.current ?? Infinity, boardItems.length); // son elemandan fazla olmasın.
        boardItems.splice(safeIndex, 0, item);

        onChange?.(item, board.key, board.columnProperties, safeIndex);

        return {
          ...board,
          items: boardItems,
        };
      }

      return board;
    });

    setData(updatedColumns);

    // Temizlik
    event.dataTransfer.clearData("item");
    event.dataTransfer.clearData("fromColumn");
    _hoverItemIndex.current = null;
  };

  const handleItemsDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const item = event.currentTarget as HTMLElement;

    if (!item.classList.contains("dragging")) item.classList.add("dragging");
  };

  const handleItemsDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const item = event.currentTarget as HTMLElement;
    const rect = item.getBoundingClientRect();
    const { clientX, clientY } = event;

    const isInside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;

    if (!isInside && item.classList.contains("dragging")) {
      item.classList.remove("dragging");
    }
  };

  const handleItemsDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const item = event.currentTarget as HTMLElement;

    if (item.classList.contains("dragging")) item.classList.remove("dragging");
  };

  const handleStartScroll = (direction: "left" | "right") => {
    const el = _kanbanWrapper.current;
    if (!el) return;

    handleStopScroll();

    _scrollInterval.current = window.setInterval(() => {
      el.scrollLeft += direction === "left" ? -10 : 10;
    }, 16); // ~60fps
  };

  const handleStopScroll = () => {
    if (_scrollInterval.current) {
      clearInterval(_scrollInterval.current);
      _scrollInterval.current = null;
    }
  };

  const stopScrolling = () => {
    if (_scrollAnimationFrame.current) {
      cancelAnimationFrame(_scrollAnimationFrame.current);
      _scrollAnimationFrame.current = null;
    }

    _scrollSpeedRef.current = 0;
  };

  const darkenColor = (hex: string, percent: number) => {
    let num = parseInt(hex.slice(1), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = ((num >> 8) & 0x00ff) - amt,
      B = (num & 0x0000ff) - amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  // useEffects
  useEffect(() => {
    const selectMap = new Map<string, Set<string | null>>();
    const dateMap = new Map<string, true>();

    columns.forEach((col) => {
      col.items.forEach((item) => {
        const keys = config?.filter?.keys(item);

        keys?.forEach((k) => {
          if (k.type === "select") {
            if (!selectMap.has(k.name)) selectMap.set(k.name, new Set());

            selectMap.get(k.name)!.add(k.key ?? null);
          }

          if (k.type === "date") dateMap.set(k.name, true);
        });
      });
    });

    setSelectFilters(Object.fromEntries(Array.from(selectMap.entries()).map(([name, set]) => [name, Array.from(set)])));
    setDateFilters((prev) => {
      const next = { ...prev };

      Array.from(dateMap.keys()).forEach((name) => {
        if (!next[name]) {
          next[name] = { from: null, to: null };
        }
      });

      return next;
    });
  }, [columns]);

  useEffect(() => {
    let nextData = columns.map((col) => ({
      ...col,
      items: [...col.items],
    }));

    // Search varsa...
    if (config?.filter?.search && search?.trim()) {
      const q = search.trim();

      nextData = nextData.map((col) => ({
        ...col,
        items: col.items.filter((item) => config.filter!.search!(item, q)),
      }));
    }

    // Select ve Date varsa...
    nextData = nextData.map((col) => ({
      ...col,
      items: col.items.filter((item) => {
        const keys = config?.filter?.keys(item) ?? [];

        // Select (checkbox)
        const selectOk = Object.entries(selectedFilters).every(([filterName, selectedSet]) => {
          if (!selectedSet || selectedSet.size === 0) return true;

          const value = keys.find((k) => k.name === filterName)?.key ?? null;

          return selectedSet.has(value);
        });

        if (!selectOk) return false;

        // Date (range)
        const dateOk = Object.entries(dateFilters).every(([filterName, range]) => {
          if (!range.from && !range.to) return true;

          const raw = keys.find((k) => k.name === filterName)?.key;
          if (!raw) return false;

          const d = new Date(raw);
          if (range.from && d < range.from) return false;
          if (range.to && d > range.to) return false;

          return true;
        });

        return dateOk;
      }),
    }));

    setData(nextData);
  }, [columns, search, selectedFilters, dateFilters]);

  return (
    <>
      {config?.filter && (
        <Filter
          states={{
            search: {
              get: search,
              set: setSearch,
            },
            dateFilters: {
              get: dateFilters,
              set: setDateFilters,
            },
            selectFilters: {
              get: selectFilters,
              set: setSelectFilters,
            },
            selectedFilters: {
              get: selectedFilters,
              set: setSelectedFilters,
            },
          }}
        />
      )}

      <div
        ref={_kanbanWrapper}
        className="ar-kanban-board"
        style={{
          height: `calc(100dvh - (${_kanbanWrapper.current?.getBoundingClientRect().top}px + ${config?.safeAreaOffset?.bottom ?? 0}px))`,
        }}
        onDragOver={handleBoardDragOver}
        onDragEnd={stopScrolling}
        onDrop={stopScrolling}
      >
        <div className="buttons">
          <div
            className="button left"
            onMouseDown={() => handleStartScroll("left")}
            onMouseUp={handleStopScroll}
            onMouseLeave={handleStopScroll}
          >
            <ARIcon icon={"ArrowLeft"} />
          </div>
          <div
            className="button right"
            onMouseDown={() => handleStartScroll("right")}
            onMouseUp={handleStopScroll}
            onMouseLeave={handleStopScroll}
          >
            <ARIcon icon={"ArrowRight"} />
          </div>
        </div>

        <div className="titles">
          {data.map((board, index) => (
            <div key={index} className="title">
              <h4>
                <span
                  style={{
                    backgroundColor: darkenColor(board.titleColor ?? "", 1),
                    borderColor: darkenColor(board.titleColor ?? "", 1),
                  }}
                ></span>
                {board.title.toLocaleUpperCase("tr")}
              </h4>
              {board.description && <span>{board.description}</span>}
            </div>
          ))}
        </div>

        <div className="columns">
          {data.map((board, index) => (
            <div key={index} className="column" onDrop={handleDrop(board.key)}>
              <div
                className="items"
                onDragOver={handleItemsDragOver}
                onDragLeave={handleItemsDragLeave}
                onDrop={handleItemsDrop}
              >
                <DnD
                  key={board.key}
                  data={board.items}
                  renderItem={(item, dndIndex) => {
                    return (
                      <div
                        key={dndIndex}
                        className="item"
                        onDragOver={(event) => {
                          event.preventDefault();

                          const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
                          const mouseY = event.clientY;
                          const isBelow = mouseY > rect.top + rect.height / 2;

                          _hoverItemIndex.current = isBelow ? index + 1 : index;
                        }}
                      >
                        {board.renderItem(item, index)}
                      </div>
                    );
                  }}
                  columnKey={board.key}
                  confing={{ isMoveIcon: false }}
                  // onChange={(data) => {
                  //   const now = Date.now();

                  //   setBoardData((prev) =>
                  //     prev.map((col) => (col.key === board.key ? { ...col, items: data,  } : col))
                  //   );
                  // }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
