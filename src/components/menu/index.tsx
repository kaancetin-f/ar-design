"use client";

import React, { useRef } from "react";
import "../../libs/styles/menu/menu.css";
import { MenuItemType, MenuItemVariant, MenuProps, Props } from "./Types";
import Divider from "../divider";

const handleOnClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, item: MenuProps, variant: MenuItemVariant) => {
  event.stopPropagation();

  if (variant === "vertical" && item.type === "group") return;

  const _current = event.target as HTMLDivElement;
  const ulElement = _current.nextElementSibling as HTMLUListElement;

  if (_current && item.submenu && item.submenu.length > 0) {
    _current.classList.toggle("ar-angle-down");
    _current.classList.toggle("ar-angle-up");
  }

  if (ulElement) ulElement.classList.toggle("opened");
};

/**
 * Alt menüleri sürekli olarak eklemek için özyinelemeli fonksiyon.
 * @param item - Menü öğelerinin dizisi
 * @param type - "group" | "divider" | "none" türlerinden birisi gönderilmelidir.
 * @returns Menü yapısını temsil eden iç içe geçmiş liste
 */
const SubMenu: React.FC<{
  items?: MenuProps[];
  variant: MenuItemVariant;
  type?: MenuItemType;
}> = ({ items, variant, type }) => {
  if (!items) return null;

  // refs
  let _className_ul = useRef<string>("ar-menu-core-list-item-groups").current;
  let _className_li = useRef<string>("ar-menu-core-list-item-group-item").current;
  let _className_groupTitle = useRef<string>("ar-menu-core-list-item-group-item-title").current;

  if (variant === "vertical" && type === "group") _className_ul += " opened";

  return (
    <ul className={_className_ul}>
      {items.map((item, index) => {
        if (item.submenu && item.submenu.length > 0) {
          if (variant === "vertical" && item.type === "group") _className_groupTitle += " group";
          if (variant === "horizontal" || item.type !== "group") _className_groupTitle += " ar-angle-down";
        }

        return (
          <li key={index} className={_className_li} onClick={(event) => handleOnClick(event, item, variant)}>
            <div className={_className_groupTitle}>{item.render}</div>

            {/* Alt menü öğeleri */}
            <SubMenu items={item.submenu} variant={variant} type={item.type} />
          </li>
        );
      })}
    </ul>
  );
};

const Menu: React.FC<Props> = ({ menu, variant = "vertical", ...attributes }) => {
  const handleClassName = () => {
    let className: string = "ar-menu-core-list";

    if (variant) className += ` ${variant}`;

    return className;
  };

  return (
    <nav className="ar-menu-core" {...attributes}>
      <ul className={handleClassName()}>
        {menu.map((item, index) => {
          // refs
          let _className_groupTitle = useRef<string>("ar-menu-core-list-item-group-item-title").current;

          if (item.submenu && item.submenu.length > 0) {
            if (variant === "vertical" && item.type === "group") _className_groupTitle += " group";
            if (variant === "horizontal" || item.type !== "group") _className_groupTitle += " ar-angle-down";
          }

          return (
            <li key={index} className="ar-menu-core-list-item" onClick={(event) => handleOnClick(event, item, variant)}>
              {item.type === "divider" ? <Divider /> : <div className={_className_groupTitle}>{item.render}</div>}

              {/* Alt menü öğeleri */}
              <SubMenu items={item.submenu} variant={variant} type={item.type} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
