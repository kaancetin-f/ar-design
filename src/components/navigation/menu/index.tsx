"use client";

import React, { useState } from "react";
import "../../../assets/css/components/navigation/menu/styles.css";
import Divider from "../../data-display/divider";
import { MenuItemVariants, MenuProps } from "../../../libs/types";
import IProps from "./IProps";

const handleOnClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  event.stopPropagation();

  const target = event.currentTarget as HTMLLIElement;
  const childNodes = Array.from(target.childNodes);
  const ul = childNodes.filter((child) => child instanceof HTMLUListElement); // UL
  const div = childNodes.filter((child) => child instanceof HTMLDivElement); // Item Render

  if (ul.length > 0) {
    const span = div[0].childNodes[div[0].childNodes.length - 1] as HTMLSpanElement;
    span.classList.toggle("opened");
    ul[0].classList.toggle("opened");
  } else {
    const selectedItems = document.querySelectorAll(".selected");
    selectedItems.forEach((item) => item.classList.remove("selected"));

    target.classList.add("selected");
  }
};

/**
 * Alt menüleri sürekli olarak eklemek için özyinelemeli fonksiyon.
 * @param items - Menü öğelerinin dizisi
 * @param variant - Menü varyantı, "vertical" veya "horizontal"
 * @param type - "group" | "divider" türlerinden birisi olmalıdır.
 * @returns Menü yapısını temsil eden iç içe geçmiş liste
 */

const SubMenu: React.FC<{
  items: MenuProps[];
  variant: MenuItemVariants;
  setSelectedMenu: React.Dispatch<React.SetStateAction<MenuProps[]>>;
  selectedMenu: MenuProps[];
  setSelectedItem: React.Dispatch<React.SetStateAction<MenuProps | null>>;
  selectedItem: MenuProps | null;
}> = ({ items, variant, setSelectedMenu, selectedMenu, setSelectedItem, selectedItem }) => {
  if (!items) return null;

  return (
    <ul>
      {items.map((item, index) => {
        return (
          <li key={index} onClick={handleOnClick}>
            <div className="item-render">
              <span>{item.icon ? item.icon : <span className="no-icon"></span>}</span>
              {item.type === "divider" ? <Divider /> : <span>{item.render}</span>}
              {item.type === "group" && <span className="angel-down"></span>}
            </div>

            {/* Alt menü öğeleri */}
            {item.submenu && (
              <SubMenu
                items={item.submenu}
                variant={variant}
                setSelectedMenu={setSelectedMenu}
                selectedMenu={selectedMenu}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const Menu: React.FC<IProps> = ({ data, variant = "vertical", ...attributes }) => {
  // states
  const [selectedMenu, setSelectedMenu] = useState<MenuProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuProps | null>(null);

  return (
    <nav className="ar-menu" {...attributes}>
      <ul>
        {data.map((item, index) => {
          return (
            <li key={index} onClick={handleOnClick}>
              <div className="item-render">
                <span>{item.icon ? item.icon : <span className="no-icon"></span>}</span>
                {item.type === "divider" ? <Divider /> : <span>{item.render}</span>}
                {item.type === "group" && <span className="angel-down"></span>}
              </div>

              {/* Alt menü öğeleri */}
              {item.submenu && (
                <SubMenu
                  items={item.submenu}
                  variant={variant}
                  setSelectedMenu={setSelectedMenu}
                  selectedMenu={selectedMenu}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
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
