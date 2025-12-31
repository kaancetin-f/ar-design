import React from "react";
import { IChildren } from "../../libs/types/IGlobalProps";

export interface ILayoutProps extends IChildren {}
export interface IHeaderProps {
  actions?: React.ReactNode;
}
export interface ILSiderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: {
    default: React.ReactElement<SVGElement | HTMLImageElement>;
    mini: React.ReactElement<SVGElement | HTMLImageElement>;
    onClick?: () => void;
  };
  footer?: string;
}
export interface IMainProps extends IChildren {}
export interface ISectionProps extends IChildren {
  fullWidth?: boolean;
}
