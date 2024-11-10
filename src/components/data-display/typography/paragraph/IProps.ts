import { ParagraphColors, Status } from "../../../../libs/types";
import { IChildren, IGlobalProps } from "../../../../libs/types/IGlobalProps";

interface IProps extends Omit<IGlobalProps, "status">, IChildren {
  color?: ParagraphColors | Status;
  align?: "left" | "center" | "right";
}

export default IProps;
