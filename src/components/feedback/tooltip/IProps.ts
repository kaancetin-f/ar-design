import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren {
  text: string | string[];
  direction?: "top" | "right" | "left" | "bottom";
}

export default IProps;
