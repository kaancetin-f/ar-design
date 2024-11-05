import React from "react";
import { IGlobalProps } from "../../libs/types/IGlobalProps";

interface ILayoutProps
  extends Omit<IGlobalProps, "variant" | "status" | "icon" | "border" | "size" | "upperCase"> {}

interface IHeaderProps {
  logoWrapper?: {
    image?: React.ReactElement<SVGElement | HTMLImageElement>;
    text?: string | React.JSX.Element;
  };
  actions?: React.ReactNode[];
}

interface IMainProps
  extends Omit<IGlobalProps, "variant" | "status" | "icon" | "border" | "size" | "upperCase"> {}

interface ISectionProps
  extends Omit<IGlobalProps, "variant" | "status" | "icon" | "border" | "size" | "upperCase"> {}

export { ILayoutProps, IHeaderProps, IMainProps, ISectionProps };
