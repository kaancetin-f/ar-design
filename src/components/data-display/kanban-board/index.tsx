"use client";

import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import { KanbanBoardColumnType } from "../../../libs/types";
import "../../../assets/css/components/data-display/kanban-board/styles.css";
import DnD from "../dnd";

const KanbanBoard = function <T, TColumnProperties>({ trackBy, columns, onChange }: IProps<T, TColumnProperties>) {
  // refs
  const _kanbanWrapper = useRef<HTMLDivElement>(null);
  const _hoverItemIndex = useRef<number | null>(null);
  const _scrollAnimationFrame = useRef<number | null>(null);
  const _scrollSpeedRef = useRef(0); // px/frame

  // states
  const [data, setData] = useState<KanbanBoardColumnType<T, TColumnProperties>[]>([]);

  // methods
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

  const handleDragOverBoard = (event: React.DragEvent) => {
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
  useEffect(() => setData(columns), [columns]);

  return (
    <div
      ref={_kanbanWrapper}
      className="ar-kanban-board"
      onDragOver={handleDragOverBoard}
      onDragEnd={stopScrolling}
      onDrop={stopScrolling}
    >
      <div className="columns">
        {data.map((board, index) => (
          <div
            key={index}
            className="column"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop(board.key)}
          >
            <div className="title">
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

            <div className="items">
              <DnD
                key={board.key}
                data={board.items}
                renderItem={(item, index) => {
                  return (
                    <div
                      key={index}
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
  );
};

export default KanbanBoard;
