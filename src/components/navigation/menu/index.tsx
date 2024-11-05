"use client";

import React, { useState } from "react";
import { Props } from "./Types";
import "../../../assets/css/components/navigation/menu/menu.css";
import Divider from "../../data-display/divider";
import { MenuItemType, MenuItemVariants, MenuProps } from "../../../libs/types";

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
  type?: MenuItemType;
  setSelectedMenu: React.Dispatch<React.SetStateAction<MenuProps[]>>;
  selectedMenu: MenuProps[];
  setSelectedItem: React.Dispatch<React.SetStateAction<MenuProps | null>>;
  selectedItem: MenuProps | null;
}> = ({ items, variant, type, setSelectedMenu, selectedMenu, setSelectedItem, selectedItem }) => {
  if (!items) return null;

  let className: string[] = ["list"];

  if (variant === "vertical" && type === "group") className.push("opened");

  return (
    <ul className={className.map((c) => c).join(" ")}>
      {items.map((item, index) => {
        let className_li: string[] = ["item"];

        if (item.submenu && item.submenu.length > 0) {
          if (variant === "horizontal" || item.type !== "group")
            if (selectedMenu.length > 0 && selectedMenu.includes(item) && item.type !== "group") {
              // Eğer seçili olan menüyse "selected" sınıfını ekler.
              className_li.push("selected");
            }
        }

        return (
          <li key={index} className={className_li.map((c) => c).join(" ")} onClick={handleOnClick}>
            {item.render}

            {/* Alt menü öğeleri */}
            {item.submenu && (
              <SubMenu
                items={item.submenu}
                variant={variant}
                type={item.type}
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
  // refs
  let _className_li: string[] = ["item"];

  // states
  const [selectedMenu, setSelectedMenu] = useState<MenuProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuProps | null>(null);

  return (
    <nav className="ar-menu" {...attributes}>
      <ul className={"list"}>
        {data.map((item, index) => {
          return (
            <li
              key={index}
              className={_className_li.map((c) => c).join(" ")}
              onClick={handleOnClick}
            >
              {item.type === "divider" ? <Divider /> : item.render}

              {/* Alt menü öğeleri */}
              {item.submenu && (
                <SubMenu
                  items={item.submenu}
                  variant={variant}
                  type={item.type}
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
