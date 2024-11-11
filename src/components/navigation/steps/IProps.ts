import { StepProps } from "../../../libs/types";

/**
 * Stepper component props
 */
interface IProps {
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
