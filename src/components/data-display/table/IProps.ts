import React from "react";
import { TableColumnType } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

export type SearchedParam = { [key: string]: string };

type ActionType = {
  tooltip: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

interface IProps<T> extends IChildren {
  title?: string;
  description?: string;
  data: T[];
  columns: TableColumnType<T>[];
  actions?: {
    create?: ActionType;
    import?: ActionType;
    filterClear?: ActionType;
  };
  selections?: (selectionItems: T[]) => void;
  previousSelections?: T[];
  searchedParams?: (params: SearchedParam | undefined, query: string) => void;
  pagination?: {
    totalRecords: number;
    perPage: number;
    onChange: (currentPage: number) => void;
  };
  config?: {
    isServerSide?: boolean;
    isSearchable?: boolean;
    scroll?: {
      maxHeight: number;
    };
  };
}

export default IProps;
