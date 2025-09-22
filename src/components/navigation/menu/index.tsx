"use client";

import React, { useEffect, useState } from "react";
import "../../../assets/css/components/navigation/menu/styles.css";
import { MenuProps } from "../../../libs/types";
import IProps from "./IProps";
import SubMenu from "./SubMenu";

const Menu: React.FC<IProps> = ({ data, variant = "vertical", ...attributes }) => {
  // states
  const [selectedMenu, setSelectedMenu] = useState<MenuProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuProps | null>(null);

  // variables
  const sessionStorageKey: string = "selected-menu-item";

  // methods
  const handleClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: MenuProps,
    setSelectedItem: React.Dispatch<React.SetStateAction<MenuProps | null>>
  ) => {
    event.stopPropagation();

    const target = event.currentTarget as HTMLLIElement;
    const childNodes = Array.from(target.childNodes);
    const ul = childNodes.filter((child) => child instanceof HTMLUListElement); // alt menü UL
    const div = childNodes.filter((child) => child instanceof HTMLDivElement); // item render div

    if (ul.length > 0) {
      // Alt menüyü aç/kapa.
      const span = div[0].querySelector(".angel-down") as HTMLSpanElement;
      span?.classList.toggle("opened");
      ul[0].classList.toggle("opened");
    } else {
      const selectedItems = document.querySelectorAll(".selected");
      selectedItems.forEach((el) => el.classList.remove("selected"));

      if (!target.classList.contains("divider")) {
        target.classList.add("selected");

        // SessionStorage'a kaydeder.
        setSelectedItem(item);
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(item));
      }
    }
  };

  const openParentMenusDOM = (li: HTMLLIElement | null) => {
    if (!li) return;

    let parent = li.parentElement; // ul
    while (parent && parent.tagName === "DIV") {
      const parentLi = parent.closest("li");
      if (parentLi) {
        const ul = parentLi.querySelector("ul");
        const span = parentLi.querySelector(".angel-down");
        ul?.classList.add("opened");
        span?.classList.add("opened");
      }
      parent = parentLi?.parentElement || null;
    }
  };

  // useEffects
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem(sessionStorageKey) ?? "{}");

    if (stored) setSelectedItem(stored);
    else setSelectedItem(data[0]);

    // DOM üzerinde seçili li elementini bul ve üst menüleri aç
    const li = document.querySelector(`li[data-menu-id="ar-menu-${stored.key}"]`) as HTMLLIElement;
    openParentMenusDOM(li);
  }, [data]);

  return (
    <nav className="ar-menu" {...attributes}>
      <ul>
        {data.map((item, index) => {
          return (
            <li
              key={index}
              data-menu-id={`ar-menu-${item.key}`}
              className={`${item.type === "divider" ? "divider" : ""} ${
                selectedItem?.key === item.key ? "selected" : ""
              }`}
              onClick={(event) => handleClick(event, item, setSelectedItem)}
            >
              <div className="item-render">
                {item.type !== "divider" && <span>{item.icon ? item.icon : <span className="no-icon"></span>}</span>}
                {item.type === "divider" ? <hr /> : <span className="item">{item.render}</span>}
                {item.type === "group" && <span className="angel-down"></span>}
              </div>

              {item.submenu && (
                <SubMenu
                  items={item.submenu}
                  variant={variant}
                  setSelectedMenu={setSelectedMenu}
                  selectedMenu={selectedMenu}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                  handleClick={handleClick}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Menu.displayName = "Menu";
export default Menu;
