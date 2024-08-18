import React from "react";

export type MenuItemVariant = "vertical" | "horizontal";
export type MenuItemType = "group" | "divider";

export interface MenuProps {
  render?: string | React.JSX.Element;
  type?: MenuItemType;
  icon?: React.JSX.Element;
  submenu?: MenuProps[];
}

export type Props = {
  menu: MenuProps[];
  variant?: MenuItemVariant;
} & React.HTMLAttributes<HTMLElement>;
