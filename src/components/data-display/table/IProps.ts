import React from "react";
import { TableColumnType } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

export type SearchedParam = { [key: string]: string };

interface IProps<T> extends IChildren {
  title?: string;
  description?: string;
  data: T[];
  columns: TableColumnType<T>[];
  actions?: {
    create?: {
      tooltip: string;
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };
    import?: {
      tooltip: string;
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };
  };
  selections?: (selectionItems: T[]) => void;
  searchedParams?: (params: SearchedParam | undefined, query: string) => void;
  pagination?: {
    totalRecords: number;
    perPage: number;
    onChange: (currentPage: number) => void;
  };

  config?: {
    isServerSide?: boolean;
    isSearchable?: boolean;
    isCleanFilter?: boolean;
    scroll?: {
      maxHeight: number;
    };
  };
}

export default IProps;
