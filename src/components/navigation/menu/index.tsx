"use client";

import React, { useRef, useState } from "react";
import { MenuItemType, MenuProps, Props } from "./Types";
import "../../../assets/css/components/navigation/menu/menu.css";
import Divider from "../../data-display/divider";
import { MenuItemVariants } from "../../../libs/types/Variants";

const handleOnClick = (
  event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  item: MenuProps,
  variant: MenuItemVariants,
  setSelectedItem: React.Dispatch<React.SetStateAction<MenuProps | null>> | null,
  setSelectedMenu?: React.Dispatch<React.SetStateAction<MenuProps[]>> | null
) => {
  event.stopPropagation();

  if (variant === "vertical" && item.type === "group") return;

  const _current = event.target as HTMLDivElement;
  const ulElement = _current.nextElementSibling as HTMLUListElement;

  if (_current && item.submenu && item.submenu.length > 0) {
    _current.classList.toggle("ar-angle-down");
    _current.classList.toggle("ar-angle-up");
  }

  if (ulElement) ulElement.classList.toggle("opened");

  // Birden fazla menü açılmışsa...
  if (setSelectedMenu) setSelectedMenu((prevSelectedMenu) => [...prevSelectedMenu, item]);
  else {
    if (setSelectedItem) setSelectedItem(item);
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

  // refs
  let _className_ul = useRef<string>("ar-menu-list-item-groups").current;

  if (variant === "vertical" && type === "group") _className_ul += " opened";

  return (
    <ul className={_className_ul}>
      {items.map((item, index) => {
        // refs
        let _className_li = useRef<string>("ar-menu-list-item-group-item").current;
        let _className_groupTitle = useRef<string>("ar-menu-list-item-group-item-title").current;

        if (variant === "vertical" && item.type === "group") _className_groupTitle += " group";

        if (item.submenu && item.submenu.length > 0) {
          if (variant === "horizontal" || item.type !== "group")
            _className_groupTitle += " ar-angle-down";

          // Eğer seçili olan menüyse "selected" sınıfını ekler.
          if (selectedMenu.length > 0 && selectedMenu.includes(item) && item.type !== "group")
            _className_li += " selected";
        }

        // Eğer seçili olan menüyse "selected" sınıfını ekler.
        if (selectedItem === item) _className_groupTitle += " selected";

        return (
          <li
            key={index}
            className={_className_li}
            onClick={(event) => {
              if (item.submenu && item.submenu.length > 0)
                handleOnClick(event, item, variant, null, setSelectedMenu);
              else handleOnClick(event, item, variant, setSelectedItem, null);
            }}
          >
            <div className={_className_groupTitle}>{item.render}</div>

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

const Menu: React.FC<Props> = ({ menu, variant = "vertical", ...attributes }) => {
  // refs
  let _className_li = useRef<string>("ar-menu-list-item").current;

  // states
  const [selectedMenu, setSelectedMenu] = useState<MenuProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuProps | null>(null);

  const handleClassName = () => {
    let className: string = "ar-menu-list";

    if (variant) className += ` ${variant}`;

    return className;
  };

  return (
    <nav className="ar-menu" {...attributes}>
      <ul className={handleClassName()}>
        {menu.map((item, index) => {
          // refs
          let _className_groupTitle = useRef<string>("ar-menu-list-item-group-item-title").current;

          if (variant === "vertical" && item.type === "group") _className_groupTitle += " group";

          if (item.submenu && item.submenu.length > 0) {
            if (variant === "horizontal" || item.type !== "group")
              _className_groupTitle += " ar-angle-down";
          }

          // Eğer seçili olan menüyse "selected" sınıfını ekler.
          if (
            selectedMenu.length > 0 &&
            selectedMenu.includes(item) &&
            item.type !== "group" &&
            variant !== "horizontal"
          )
            _className_li += " selected";

          return (
            <li
              key={index}
              className={_className_li}
              onClick={(event) => handleOnClick(event, item, variant, null, setSelectedMenu)}
            >
              {item.type === "divider" ? (
                <Divider />
              ) : (
                <div className={_className_groupTitle}>{item.render}</div>
              )}

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
