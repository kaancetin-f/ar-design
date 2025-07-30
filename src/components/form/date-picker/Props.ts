import { IBorder, IColors, ISize, IStatus, IValidation, IVariant } from "../../../libs/types/IGlobalProps";

type Props = {
  /**
   * Bileşenin başlığı veya etiket metnidir.
   *
   * Genellikle input, buton gibi öğelerin ne amaçla kullanıldığını belirtmek için görüntülenir.
   *
   * Örneğin;
   *
   * ```jsx
   * <DatePicker label="Başlangıç Saati" />
   * ```
   */
  label?: string;

  /**
   * Bileşenin yanında bir saat (clock/time picker) bileşeni olup olmadığını belirtir.
   *
   * - `true`: Saat bileşeninide ekleyerek davranır.
   * - `false` veya belirtilmemişse: Standart davranış sergiler.
   *
   * Örneğin;
   *
   * ```jsx
   * <DatePicker isClock />
   * ```
   */
  isClock?: boolean;

  /**
   * Bileşenin değerinde bir değişiklik olduğunda tetiklenen olaydır.
   *
   * - `value`: Güncel değeri temsil eder. Genellikle string türündedir (örneğin tarih veya tarih, saat).
   *
   * Örneğin;
   *
   * ```jsx
   * <DatePicker onChange={(value) => console.log(value)} />
   * ```
   */
  onChange: (value: string) => void;
} & IVariant &
  IColors &
  IStatus &
  IBorder &
  ISize &
  IValidation &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "onChange" | "size" | "color">;

export default Props;
