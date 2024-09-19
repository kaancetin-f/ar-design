import { IGlobalProps } from "../../libs/types/IGlobalProps";
import { MenuProps } from "../navigation/menu/Types";

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
