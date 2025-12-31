"use client";

import React, { useEffect, useState } from "react";
import "../../../assets/css/components/navigation/menu/styles.css";
import { MenuProps } from "../../../libs/types";
import IProps from "./IProps";
import { DispatchEvent, SessionStorage } from "../../../libs/infrastructure/shared/Enums";

const Menu: React.FC<IProps> = ({ data, variant = "vertical", config, ...attributes }) => {
  // states
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isMenuLocked, setIsMenuLocked] = useState<boolean>(true);

  // methods
  const handleItemClick = (item: MenuProps) => {
    if (!isMenuLocked && item.type === "group") return;

    if (item.type === "group") {
      const parents = findPath(item.key as string, data) ?? [];

      setOpenMenus((prev) => {
        const isOpen = prev.includes(item.key as string);

        if (isOpen) return prev.filter((k) => k !== item.key);

        return [...parents, item.key as string];
      });

      return;
    }

    if (item.type !== "divider") {
      setSelectedKey(item.key as string);
      sessionStorage.setItem(SessionStorage.SelectedMenuItem, String(item.key));
    }
  };

  const findPath = (key: string, items: MenuProps[], path: string[] = []): string[] | null => {
    for (const item of items) {
      if (item.key === key) return path;

      if (item.submenu) {
        const result = findPath(key, item.submenu, [...path, item.key as string]);

        if (result) return result;
      }
    }
    return null;
  };

  // useEffects
  useEffect(() => {
    if (!data.length) return;

    const selectedMenuItem = sessionStorage.getItem(SessionStorage.SelectedMenuItem) ?? "";

    setSelectedKey(selectedMenuItem);

    const parents = findPath(selectedMenuItem, data);

    if (parents) setOpenMenus(parents);
  }, [data]);

  useEffect(() => {
    const onStorageChange = () => {
      setIsMenuLocked(JSON.parse(sessionStorage.getItem(SessionStorage.MenuIsLocked) ?? "true"));
    };

    window.addEventListener(DispatchEvent.MenuLock, onStorageChange);
    window.addEventListener("storage", onStorageChange);

    const styles = document.createElement("style");
    styles.innerHTML = `
      :root {
        --selected-icon-color: ${config?.icon?.selectedColor};
        --selected-icon-bg-color: ${config?.icon?.selectedBackgroundColor};
        --selected-icon-bg-color-rgb: ${config?.icon?.selectedBackgroundBorderColor};
      }
    `;
    document.head.appendChild(styles);

    return () => {
      window.removeEventListener(DispatchEvent.MenuLock, onStorageChange);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return (
    <nav className="ar-menu" {...attributes}>
      <ul>
        {data.map((item) => (
          <MenuItem
            key={item.key}
            item={item}
            openMenus={openMenus}
            selectedKey={selectedKey}
            isMenuLocked={isMenuLocked}
            onClick={handleItemClick}
          />
        ))}
      </ul>
    </nav>
  );
};

interface MenuItemProps {
  item: MenuProps;
  openMenus: string[];
  selectedKey: string | null;
  isMenuLocked: boolean;
  onClick: (item: MenuProps) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, openMenus, selectedKey, isMenuLocked, onClick }) => {
  const isOpen = openMenus.includes(item.key as string);
  const isSelected = selectedKey === item.key && item.type !== "group";

  return (
    <li
      data-menu-id={`ar-menu-${item.key}`}
      className={`${item.type === "divider" ? "divider" : ""} ${isSelected ? "selected" : ""}`}
    >
      <div className={`item-render ${isMenuLocked ? "align-left" : "align-center"}`} onClick={() => onClick(item)}>
        {item.type !== "divider" && <span className="icon">{item.icon ?? <span className="no-icon" />}</span>}

        {isMenuLocked && (item.type === "divider" ? <hr /> : <span className="item">{item.render}</span>)}

        {isMenuLocked && item.type === "group" && <span className={`angel-down ${isOpen ? "opened" : ""}`} />}
      </div>

      {item.submenu && isMenuLocked && (
        <ul className={`submenu ${isOpen ? "opened" : ""}`}>
          <div className="submenu-inner">
            {item.submenu.map((sub) => (
              <MenuItem
                key={sub.key}
                item={sub}
                openMenus={openMenus}
                selectedKey={selectedKey}
                isMenuLocked={isMenuLocked}
                onClick={onClick}
              />
            ))}
          </div>
        </ul>
      )}
    </li>
  );
};

Menu.displayName = "Menu";
export default Menu;
