import { IChildren } from "../../../../libs/types/IGlobalProps";

type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface IProps extends IChildren {
  size?:
    | {
        xl?: Column;
        lg?: Column;
        md?: Column;
        sm?: Column;
        xs?: Column;
      }
    | number;
  align?: "left" | "center" | "right";
}

export default IProps;
