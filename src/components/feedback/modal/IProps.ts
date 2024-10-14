import React from "react";
import { Sizes } from "../../../libs/types";

interface IProps {
  children: React.ReactNode;
  title: string;
  size?: Sizes | "full";
  footer?: React.ReactNode;
}

export default IProps;
