import React from "react";
import { AllowedTypes, TableColumnType } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

export type SearchedParam = { [key: string]: string };

type ImportActionType = {
  tooltip: string;
  allowedTypes?: AllowedTypes[];
  onClick: (formData: FormData | undefined, files: File[]) => void;
};

type CreateActionType = {
  tooltip: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

interface IProps<T> extends IChildren {
  title?: string;
  description?: string;
  data: T[];
  columns: TableColumnType<T>[];
  actions?: {
    import?: ImportActionType;
    create?: CreateActionType;
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
    subrowSelector?: string;
  };
}

export default IProps;
