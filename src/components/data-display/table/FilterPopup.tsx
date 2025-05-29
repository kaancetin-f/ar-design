import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface IProps {
  children: ReactNode;
  tableContent: MutableRefObject<HTMLDivElement | null>;
  coordinate: { x: number; y: number };
  buttons: MutableRefObject<(HTMLSpanElement | null)[]>;
}

const FilterPopup = ({ children, tableContent, coordinate, buttons }: IProps) => {
  // refs
  const _arTableFilterPopup = useRef<HTMLDivElement>(null);

  // states
  const [open, setOpen] = useState<boolean>(false);

  // methods
  const handleClickOutSide = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const clickedInsidePopup = _arTableFilterPopup.current && _arTableFilterPopup.current.contains(target);
    const isOneOfButtons = buttons.current.some((button) => button === target || button?.contains(target));

    if (!clickedInsidePopup && !isOneOfButtons) setOpen(false);
  };

  const handleKeys = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "Escape") setOpen(false);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

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

  return (
    open &&
    ReactDOM.createPortal(
      <div
        ref={_arTableFilterPopup}
        className="ar-table-filter-popup"
        style={{ top: coordinate.y, left: coordinate.x }}
      >
        {children}
      </div>,
      document.body
    )
  );
};

export default FilterPopup;
