import { Color } from "../../../libs/types";
import { IIcon } from "../../../libs/types/IGlobalProps";

interface IProps {
  buttons: ({
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    color?: Color;
  } & IIcon)[];
}

export default IProps;
