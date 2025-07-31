"use client";

import React, { useRef, useState } from "react";
import IProps from "./IProps";
import Typography from "../typography";
import { KanbanBoardColumnType } from "../../../libs/types";
import "../../../assets/css/components/data-display/kanban-board/styles.css";
import DnD from "../dnd";

const { Title } = Typography;

const KanbanBoard = function <T>({ columns }: IProps<T>) {
  // refs
  const _hoverItemIndex = useRef<number | null>(null);

  // states
  const [boardData, setBoardData] = useState<KanbanBoardColumnType<T>[]>(columns);

  const handleDrop = (event: React.DragEvent, toColumn: string) => {
    event.preventDefault();

    const item = JSON.parse(event.dataTransfer.getData("item"));
    const fromColumn = event.dataTransfer.getData("fromColumn");

    if (!item || fromColumn === toColumn) return;

    const updatedColumns = boardData.map((col) => {
      if (col.key === fromColumn) {
        return {
          ...col,
          items: col.items.filter((i: any) => i.id !== item.id),
        };
      }

      if (col.key === toColumn) {
        const newItems = [...col.items];
        const safeIndex = Math.min(_hoverItemIndex.current ?? Infinity, newItems.length); // son elemandan fazla olmasın
        newItems.splice(safeIndex, 0, item);
        return {
          ...col,
          items: newItems,
        };
      }

      return col;
    });

    setBoardData(updatedColumns);

    event.dataTransfer.clearData("item");
    event.dataTransfer.clearData("fromColumn");
    _hoverItemIndex.current = null;
  };

  // methods
  const renderColumns = (_boardData: KanbanBoardColumnType<T>[]) => {
    return _boardData.map((board, cIndex) => {
      return (
        <div
          key={cIndex}
          className="column"
          onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();

            if (event.dataTransfer.getData("fromColumn") !== board.key) {
              return; // Başka kolondan geldiyse reorder yapma!
            }
          }}
          onDrop={(event) => handleDrop(event, board.key)}
        >
          <div className="title">
            <Title Level="h3">{board.title}</Title>
          </div>

          <div className="items">
            {board.items.length === 0 ? (
              <div>Henüz herhangi bir nesne yok!</div>
            ) : (
              <DnD
                data={board.items}
                renderItem={(item, index) => {
                  return (
                    <div key={index} className="item" onDragEnter={() => (_hoverItemIndex.current = index)}>
                      {board.renderItem(item, index)}
                    </div>
                  );
                }}
                columnKey={board.key}
                onChange={(data) => {
                  console.log(data);
                }}
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
