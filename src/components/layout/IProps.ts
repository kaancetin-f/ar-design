import React from "react";
import { IChildren, IGlobalProps } from "../../libs/types/IGlobalProps";

interface ILayoutProps
  extends Omit<IGlobalProps, "variant" | "status" | "icon" | "border" | "size" | "upperCase">,
    IChildren {}

interface IHeaderProps {
  logoWrapper?: {
    image?: React.ReactElement<SVGElement | HTMLImageElement>;
    text?: string | React.JSX.Element;
  };
  actions?: React.ReactNode;
}

interface IMainProps
  extends Omit<IGlobalProps, "variant" | "status" | "icon" | "border" | "size" | "upperCase">,
    IChildren {}

interface ISectionProps
  extends Omit<IGlobalProps, "variant" | "status" | "icon" | "border" | "size" | "upperCase">,
    IChildren {}

export { ILayoutProps, IHeaderProps, IMainProps, ISectionProps };
