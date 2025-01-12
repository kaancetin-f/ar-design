import { Direction } from "../../../libs/core/application/contexts/Notification";

interface IProps {
  title: string;
  message?: string;
  status: string | number;
  direction: Direction;
  trigger: boolean;
}

export default IProps;
