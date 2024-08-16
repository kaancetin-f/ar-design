"use client";

import React, { useRef } from "react";
import "../../libs/styles/menu/menu.css";
import { MenuItemType, MenuProps, Props } from "./Types";
import Divider from "../divider";

const handleOnClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, item: MenuProps) => {
  event.stopPropagation();

  if (item.type === "group") return;

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
const SubMenu: React.FC<{ items?: MenuProps[]; type?: MenuItemType }> = ({ items, type }) => {
  if (!items) return null;

  // refs
  let _className_ul = useRef<string>("ar-menu-core-list-item-groups").current;
  let _className_li = useRef<string>("ar-menu-core-list-item-group-item").current;
  let _className_groupTitle = useRef<string>("ar-menu-core-list-item-group-item-title").current;

  console.log(type, items);

  if (type === "group") _className_ul += " opened";

  return (
    <ul className={_className_ul}>
      {items.map((item, index) => {
        if (item.submenu && item.submenu.length > 0) {
          if (item.type !== "group") _className_groupTitle += " ar-angle-down";
        }

        return (
          <li key={index} className={_className_li} onClick={(event) => handleOnClick(event, item)}>
            <div className={_className_groupTitle}>{item.render}</div>

            {/* Alt menü öğeleri */}
            <SubMenu items={item.submenu} type={item.type} />
          </li>
        );
      })}
    </ul>
  );
};

const Menu: React.FC<Props> = ({ data, ...attributes }) => {
  // refs
  let _className_groupTitle = useRef<string>("ar-menu-core-list-item-group-item-title").current;

  return (
    <nav className="ar-menu-core" {...attributes}>
      <ul className="ar-menu-core-list">
        {data.map((menuItem, index) => {
          if (menuItem.submenu && menuItem.submenu.length > 0) {
            if (menuItem.type !== "group") _className_groupTitle += " ar-angle-down";
          }

          return (
            <li key={index} className="ar-menu-core-list-item" onClick={(event) => handleOnClick(event, menuItem)}>
              {menuItem.type === "divider" ? <Divider /> : <div className={_className_groupTitle}>{menuItem.render}</div>}

              {/* Alt menü öğeleri */}
              <SubMenu items={menuItem.submenu} type={menuItem.type} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
