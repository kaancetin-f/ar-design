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
}

export default IProps;
