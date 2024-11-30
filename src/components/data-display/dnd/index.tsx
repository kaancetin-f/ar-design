"use client";

import React, { useEffect, useRef } from "react";
import IProps from "./IProps";

const DnD = function <T>({ data, renderItem, onChange }: IProps<T>) {
  // refs
  const _arDnD = useRef<HTMLDivElement>(null);
  const _dragItem = useRef<HTMLElement>();

  useEffect(() => {
    if (!_arDnD.current) return;

    _arDnD.current.childNodes.forEach((item) => {
      const targetItem = item as HTMLElement;
      targetItem.draggable = true;
      targetItem.style.cursor = "move";

      targetItem.ondragstart = (event) => {
        const dragItem = event.currentTarget as HTMLElement;

        // Drag olan öğeyi yakalanıyor.
        _dragItem.current = dragItem;
        dragItem.style.opacity = "0.5";
      };

      targetItem.ondrop = (event) => {
        event.preventDefault();

        const dropItem = event.currentTarget as HTMLElement;

        if (_dragItem.current !== dropItem) {
          if (_arDnD.current && _dragItem.current) {
            const dragItemIndex = [..._arDnD.current.children].indexOf(_dragItem.current!);
            const dropItemIndex = [..._arDnD.current.children].indexOf(dropItem);

            if (dragItemIndex < dropItemIndex) {
              // Render Order
              _arDnD.current.insertBefore(_dragItem.current, dropItem.nextSibling);
            } else {
              // Render Order
              _arDnD.current.insertBefore(_dragItem.current, dropItem);
            }

            // Data Order
            data.splice(dropItemIndex, 0, data.splice(dragItemIndex, 1)[0]);
          }

          onChange(data);
        }
      };

      targetItem.ondragend = (event) => {
        const item = event.currentTarget as HTMLElement;

        item.style.opacity = "1";
      };
    });

    _arDnD.current.ondragover = (event) => event.preventDefault();
  }, [data]);

  return (
    <div ref={_arDnD} className="ar-dnd">
      {data.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export default DnD;
