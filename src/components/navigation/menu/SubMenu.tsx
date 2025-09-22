import React from "react";
import { MenuItemVariants, MenuProps } from "../../../libs/types";

const SubMenu = ({
  items,
  variant,
  setSelectedMenu,
  selectedMenu,
  setSelectedItem,
  selectedItem,
  handleClick,
}: {
  items: MenuProps[];
  variant: MenuItemVariants;
  setSelectedMenu: React.Dispatch<React.SetStateAction<MenuProps[]>>;
  selectedMenu: MenuProps[];
  setSelectedItem: React.Dispatch<React.SetStateAction<MenuProps | null>>;
  selectedItem: MenuProps | null;
  handleClick: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: MenuProps,
    setSelectedItem: React.Dispatch<React.SetStateAction<MenuProps | null>>
  ) => void;
}) => {
  if (!items) return null;

  return (
    <ul>
      <div>
        {items.map((item, index) => {
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
      </div>
    </ul>
  );
};

export default SubMenu;
