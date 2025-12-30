import React from "react";
import { IChildren } from "../../libs/types/IGlobalProps";

export interface ILayoutProps extends IChildren {}
export interface IHeaderProps {
  actions?: React.ReactNode;
}
export interface ILSiderProps extends React.HTMLAttributes<HTMLElement> {
  image?: React.ReactElement<SVGElement | HTMLImageElement>;
  text?: string | React.JSX.Element;
  footer?: string;
}
export interface IMainProps extends IChildren {}
export interface ISectionProps extends IChildren {
  fullWidth?: boolean;
}
