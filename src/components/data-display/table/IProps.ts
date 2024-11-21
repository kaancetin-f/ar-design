import { TableColumnType } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps<T> extends IChildren {
  data: T[];
  columns: TableColumnType<T>[];
  selections?: (selectionItems: T[]) => void;
  pagination?: {
    totalRecords: number;
    perPage: number;
    onChange: (currentPage: number) => void;
  };
  config?: {
    isServer?: boolean;
    isSearchable?: boolean;
    scroll?: {
      maxHeight: number;
    };
  };
}

export default IProps;
