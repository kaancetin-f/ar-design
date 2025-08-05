"use client";

import React, { useEffect, useRef, useState } from "react";
import IProps from "./IProps";
import Typography from "../typography";
import { KanbanBoardColumnType } from "../../../libs/types";
import "../../../assets/css/components/data-display/kanban-board/styles.css";
import DnD from "../dnd";
import { ARIcon } from "../../icons";

const { Title } = Typography;

const KanbanBoard = function <T>({ trackBy, columns, onChange }: IProps<T>) {
  // refs
  const _hoverItemIndex = useRef<number | null>(null);

  // states
  const [data, setData] = useState<KanbanBoardColumnType<T>[]>([]);

  // methods
  const handleDrop = (toColumn: string) => (event: React.DragEvent) => {
    event.preventDefault();

    const item = JSON.parse(event.dataTransfer.getData("item"));
    const fromColumn = event.dataTransfer.getData("fromColumn");

    if (!item || fromColumn === toColumn) return;

    const updatedColumns = data.map((board) => {
      if (board.key === fromColumn) {
        return {
          ...board,
          items: board.items.filter((_item: T) => trackBy(_item) !== trackBy(item)),
        };
      }

      if (board.key === toColumn) {
        const newItems = [...board.items];
        const safeIndex = Math.min(_hoverItemIndex.current ?? Infinity, newItems.length); // son elemandan fazla olmasın.
        newItems.splice(safeIndex, 0, item);

        console.log(board);

        onChange?.(item, board.key, safeIndex);

        return {
          ...board,
          items: newItems,
        };
      }

      return board;
    });

    setData(updatedColumns);

    // Temizlik
    event.dataTransfer.clearData("item");
    event.dataTransfer.clearData("fromColumn");
    _hoverItemIndex.current = null;

    const nodes = document.querySelectorAll("[data-id='placeholder']");
    nodes.forEach((node) => node.remove());
  };

  // useEffects
  useEffect(() => setData(columns), [columns]);

  return (
    <div className="ar-kanban-board">
      <div className="columns">
        {data.map((board, index) => (
          <div
            key={index}
            className="column"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop(board.key)}
          >
            <div className="title">
              {board.items.length > 0 && <span>{board.items.length}</span>}
              <Title Level="h4">{board.title}</Title>
            </div>

            <div className="items">
              {board.items.length === 0 ? (
                <div className="no-item">
                  <ARIcon
                    icon={"Inbox-Fill"}
                    fill="var(--gray-300)"
                    size={64}
                    style={{ position: "relative", zIndex: 1 }}
                  />
                  <span>No Data</span>
                </div>
              ) : (
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
                  // onChange={(data) => {
                  //   const now = Date.now();

                  //   setBoardData((prev) =>
                  //     prev.map((col) => (col.key === board.key ? { ...col, items: data,  } : col))
                  //   );
                  // }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
