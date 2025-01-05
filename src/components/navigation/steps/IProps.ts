import { StepProps, ValidationProperties } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

/**
 * Stepper component props
 */
interface IProps<TData extends object> extends IChildren {
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

  /**
   * ...
   */
  validation?: {
    data: TData;
    rules: ValidationProperties<TData>[];
  };
}

export default IProps;
