import { Column } from "../../../libs/types";

interface IProps<T> {
  data: T[];
  columns: Column<T>[];
  config?: {
    scroll?: {
      maxHeight: number;
    };
  };
}

export default IProps;
