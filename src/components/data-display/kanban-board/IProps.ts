import { KanbanBoardColumnType } from "../../../libs/types";

interface IProps<T, TColumnProperties> {
  trackBy: (item: T) => string;
  columns: KanbanBoardColumnType<T, TColumnProperties>[];
  onChange?: (item: T, columnKey: string, columnProperties: TColumnProperties, hoverIndex: number) => void;
}

export default IProps;
