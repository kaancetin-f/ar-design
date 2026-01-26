import { IBorder, IColors, IIcon, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps extends IVariant, IColors, IBorder, IIcon {
  text: string;
  customColor?: string;
}

export default IProps;
