import React from "react";
import { MenuItemVariants } from "../../../libs/types/Variants";

export type MenuItemType = "group" | "divider";

export type MenuProps = {
  render?: string | React.JSX.Element;
  type?: MenuItemType;
  icon?: React.JSX.Element;
  submenu?: MenuProps[];
};

export type Props = {
  menu: MenuProps[];
  variant?: MenuItemVariants;
} & React.HTMLAttributes<HTMLElement>;
