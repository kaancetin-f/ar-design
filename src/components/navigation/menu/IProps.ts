import React from "react";
import { MenuItemVariants, MenuProps } from "../../../libs/types";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  data: MenuProps[];
  variant?: MenuItemVariants;
}

export default IProps;
