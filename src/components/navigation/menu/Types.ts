import React from "react";
import { MenuItemVariants, MenuProps } from "../../../libs/types";

export type Props = {
  data: MenuProps[];
  variant?: MenuItemVariants;
} & React.HTMLAttributes<HTMLElement>;
