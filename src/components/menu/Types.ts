import React from "react";

export type MenuItemType = "group" | "divider" | "none";

export interface MenuProps {
  render?: string | React.JSX.Element;
  type?: MenuItemType;
  icon?: React.JSX.Element;
  submenu?: MenuProps[];
}

export type Props = {
  data: MenuProps[];
} & React.HTMLAttributes<HTMLElement>;
