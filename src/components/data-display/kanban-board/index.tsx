"use client";

import React, { useRef, useState } from "react";
import IProps from "./IProps";
import Typography from "../typography";
import { KanbanBoardColumnType } from "../../../libs/types";
import "../../../assets/css/components/data-display/kanban-board/styles.css";
import DnD from "../dnd";
import { ARIcon } from "../../icons";

const { Title } = Typography;

const KanbanBoard = function <T>({ columns }: IProps<T>) {
  // refs
  const _hoverItemIndex = useRef<number | null>(null);

  // states
  const [boardData, setBoardData] = useState<KanbanBoardColumnType<T>[]>(columns);

  const handleDrop = (toColumn: string) => (event: React.DragEvent) => {
    event.preventDefault();

    const item = JSON.parse(event.dataTransfer.getData("item"));
    const fromColumn = event.dataTransfer.getData("fromColumn");

    if (!item || fromColumn === toColumn) return;

    const now = Date.now();

    const updatedColumns = boardData.map((col) => {
      if (col.key === fromColumn) {
        return {
          ...col,
          items: col.items.filter((i: any) => i.id !== item.id),
          updatedAt: now,
        };
      }

      if (col.key === toColumn) {
        const newItems = [...col.items];
        const safeIndex = Math.min(_hoverItemIndex.current ?? Infinity, newItems.length); // son elemandan fazla olmasın.
        newItems.splice(safeIndex, 0, item);
        return {
          ...col,
          items: newItems,
          updatedAt: now,
        };
      }

      return col;
    });

    setBoardData(updatedColumns);

    // Temizlik
    event.dataTransfer.clearData("item");
    event.dataTransfer.clearData("fromColumn");
    _hoverItemIndex.current = null;

    const nodes = document.querySelectorAll("[data-id='placeholder']");
    nodes.forEach((node) => node.remove());
  };

  // methods
  const renderColumns = (_boardData: KanbanBoardColumnType<T>[]) => {
    return _boardData.map((board, cIndex) => {
      return (
        <div
          key={cIndex}
          className="column"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop(board.key)}
        >
          <div className="title">
            <Title Level="h5">{board.title}</Title>
            {board.items.length > 0 && <span>{board.items.length}</span>}
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
                key={`${board.key}-${board.items.map((i) => i.updatedAt).join("_")}`}
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
                //     prev.map((col) => (col.key === board.key ? { ...col, items: data, updatedAt: now } : col))
                //   );
                // }}
              />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="ar-kanban-board">
      <div className="columns">{renderColumns(boardData)}</div>
    </div>
  );
};

export default KanbanBoard;
