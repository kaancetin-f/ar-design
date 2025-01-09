import { TableColumnType } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps<T> extends IChildren {
  title?: string;
  description?: string;
  data: T[];
  columns: TableColumnType<T>[];
  actions?: {
    add?: {
      tooltip: string;
      click: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };
    import?: {
      tooltip: string;
      click: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };
  };
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
