import { Color } from "../../../libs/types";

interface IProps {
  buttons: {
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    color?: Color;
  }[];
}

export default IProps;
