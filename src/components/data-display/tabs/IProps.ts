import { TabProps } from "../../../libs/types";

/**
 * Stepper component props
 */
interface IProps {
  /**
   * Tab'ları temsil eden dizi.
   * Her bir `Tab için gerekli özellikler `TabProps` tipinde olmalıdır.
   */
  tabs: TabProps[];

  activeTab?: number;

  onChange?: (currentTab: number) => void;

  onClose?: (closeTab: number) => void;
}

export default IProps;
