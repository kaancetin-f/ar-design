import { TableColumnType } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps<T> extends IChildren {
  data: T[];
  columns: TableColumnType<T>[];
  selections?: (selectionItems: T[]) => void;
  config?: {
    perPage?: number;
    scroll?: {
      maxHeight: number;
    };
  };
}

export default IProps;
