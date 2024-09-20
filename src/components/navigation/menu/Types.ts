import React from "react";
import { MenuItemVariants, MenuProps } from "../../../libs/types";

export type Props = {
  menu: MenuProps[];
  variant?: MenuItemVariants;
} & React.HTMLAttributes<HTMLElement>;
