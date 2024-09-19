import { ParagraphColors, Status } from "../../../../libs/types";
import { IGlobalProps } from "../../../../libs/types/IGlobalProps";

interface IProps extends Omit<IGlobalProps, "status"> {
  color?: ParagraphColors | Status;
  align?: "left" | "center" | "right";
}

export default IProps;
