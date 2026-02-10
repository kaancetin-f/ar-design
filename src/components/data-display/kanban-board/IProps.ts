import { KanbanBoardColumnType } from "../../../libs/types";

interface IProps<T, TColumnProperties> {
  trackBy: (item: T) => string;
  columns: KanbanBoardColumnType<T, TColumnProperties>[];
  onChange?: (item: T, columnKey: string, columnProperties: TColumnProperties, hoverIndex: number) => void;
  config?: {
    safeAreaOffset?: { top?: number; right?: number; bottom?: number; left?: number };
    filter?: {
      search?: (item: T, value: string) => boolean;
      keys: (item: T) => { name: string; key: string; type: "select" | "date" }[];
    };
  };
}

export default IProps;
