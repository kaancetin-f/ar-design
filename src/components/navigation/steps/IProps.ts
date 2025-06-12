import { StepProps, ValidationProperties } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";

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
   * Doğrulama için kullanılan veri nesnesi.
   *
   * `TData` tipi ile esnek şekilde tanımlanır.
   */
  validation?: {
    /**
     * Doğrulama yapılacak veri.
     */
    data: TData;

    /**
     * Doğrulama kuralları dizisi.
     *
     * `ValidationProperties<TData>` tipiyle tanımlanır ve
     * `data` üzerindeki alanlara uygulanacak doğrulama kurallarını içerir.
     */
    rules: ValidationProperties<TData>[];
  };
}

export default IProps;
