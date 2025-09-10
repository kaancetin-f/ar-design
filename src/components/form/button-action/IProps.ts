import { IColors, IIcon } from "../../../libs/types/IGlobalProps";

interface IProps {
  buttons: ({
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  } & IColors &
    IIcon)[];
}

export default IProps;
