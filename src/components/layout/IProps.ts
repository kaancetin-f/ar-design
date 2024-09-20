import { MenuProps } from "../../libs/types";
import { IGlobalProps } from "../../libs/types/IGlobalProps";

interface ILayoutProps
  extends Omit<IGlobalProps, "variant" | "status" | "icon" | "border" | "size" | "upperCase"> {}

interface IHeaderProps {
  logo: string | React.JSX.Element;
  menu: MenuProps[];
}

interface IMainProps
  extends Omit<IGlobalProps, "variant" | "status" | "icon" | "border" | "size" | "upperCase"> {}

interface ISectionProps
  extends Omit<IGlobalProps, "variant" | "status" | "icon" | "border" | "size" | "upperCase"> {}

export { ILayoutProps, IHeaderProps, IMainProps, ISectionProps };
