import { StepProps } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

/**
 * Stepper component props
 */
interface IProps extends IChildren {
  /**
   * Step'leri temsil eden dizisi.
   * Her bir `Step` için gerekli özellikler `StepProps` tipinde olmalıdır.
   */
  steps: StepProps[];

  /**
   * Adım değiştiğinde tetiklenen geri çağırma fonksiyonu.
   * @param currentStep - Kullanıcının geçerli olduğu adım numarası.
   */
  onChange: (currentStep: number) => void;
}

export default IProps;
