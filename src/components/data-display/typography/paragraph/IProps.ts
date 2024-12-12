import { ParagraphColors, Status } from "../../../../libs/types";
import { IChildren, IGlobalProps, ISizes } from "../../../../libs/types/IGlobalProps";

interface IProps extends Omit<IGlobalProps, "status">, IChildren, ISizes {
  color?: ParagraphColors | Status;
  align?: "left" | "center" | "right";
}

export default IProps;
