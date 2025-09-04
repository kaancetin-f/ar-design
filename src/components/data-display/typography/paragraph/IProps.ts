import { ParagraphColors, Status } from "../../../../libs/types";
import { IChildren, ISize, IUpperCase } from "../../../../libs/types/IGlobalProps";

interface IProps extends IChildren, ISize, IUpperCase {
  color?: ParagraphColors | Status;
  align?: "left" | "center" | "right";
}

export default IProps;
