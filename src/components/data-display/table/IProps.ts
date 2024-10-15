import { TableColumnType } from "../../../libs/types";

interface IProps<T> {
  data: T[];
  columns: TableColumnType<T>[];
  config?: {
    scroll?: {
      maxHeight: number;
    };
  };
}

export default IProps;
