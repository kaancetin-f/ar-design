"use client";

import React, { useState } from "react";
import { Props } from "./Types";
import "../../../assets/css/components/navigation/menu/menu.css";
import Divider from "../../data-display/divider";
import { MenuItemVariants, MenuProps } from "../../../libs/types";

const handleOnClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  event.stopPropagation();

  const target = event.currentTarget as HTMLLIElement;
  const ul = Array.from(target.childNodes).filter((child) => child instanceof HTMLUListElement);

  if (ul.length > 0) ul[0].classList.toggle("opened");
  else {
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

  let className: string[] = ["list"];

  return (
    <ul className={className.map((c) => c).join(" ")}>
      {items.map((item, index) => {
        if (item.type === "group") className.push("opened");

        return (
          <li key={index} className="item" onClick={handleOnClick}>
            <span>{item.icon && item.icon}</span>
            {item.render}

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

const Menu: React.FC<Props> = ({ data, variant = "vertical", ...attributes }) => {
  // states
  const [selectedMenu, setSelectedMenu] = useState<MenuProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuProps | null>(null);

  return (
    <nav className="ar-menu" {...attributes}>
      <ul className="list">
        {data.map((item, index) => {
          let className_li: string[] = ["item"];

          if (item.type === "group") className_li.push("opened");

          return (
            <li
              key={index}
              className={className_li.map((c) => c).join(" ")}
              onClick={handleOnClick}
            >
              <span>{item.icon && item.icon}</span>
              {item.type === "divider" ? <Divider /> : item.render}

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
