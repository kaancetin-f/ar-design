import { Variants, Option, Status } from "../../../libs/types";
import {
  IBorder,
  IDisabled,
  IIcon,
  ISize,
  IStatus,
  IUpperCase,
  IValidation,
  IVariant,
} from "../../../libs/types/IGlobalProps";

export interface IMultiple {
  /**
   * Bileşenin durum (status) ayarlarını belirtir.
   *
   * - `color`: Genel durum rengini belirler. `Status` tipi ile tanımlanır (örneğin "success", "error" vb.).
   * - `selected`: Seçili öğelerin görünümüyle ilgili ayarlar.
   *   - `variant`: Seçili öğenin stil varyantı (`Variants` tipi).
   *   - `color`: Seçili öğenin durumu için renk (`Status` tipi).
   *
   * Örneğin;
   *
   * ```jsx
   * <Select
   *   status={{
   *     color: "warning",
   *     selected: {
   *       variant: "outlined",
   *       color: "success",
   *     },
   *   }}
   * />
   * ```
   */
  status?: {
    color?: Status;
    selected?: {
      variant?: Variants;
      color?: Status;
    };
  };

  /**
   * Bileşenin seçtiği değerlerin listesi.
   *
   * Çoklu seçim için `Option` tipinden bir dizi kullanılır.
   */
  value: Option[];

  /**
   * Seçimler değiştiğinde çağrılan olaydır.
   *
   * Yeni seçili seçenekler `Option[]` olarak parametreye geçer.
   */
  onChange: (option: Option[]) => void;

  /**
   * Bileşenin çoklu seçim modunda olduğunu belirtir.
   *
   * Sabit `true` değeri ile tanımlanır.
   */
  multiple: true;
}

export interface ISingle {
  /**
   * Bileşenin durumunu belirtir.
   *
   * `Status` tipi ile tanımlanır (örneğin "success", "error", "warning" vb.).
   *
   * Örneğin;
   *
   * ```jsx
   * <Select status="success" />
   * ```
   */
  status?: Status;

  /**
   * Bileşenin seçili değeri.
   *
   * Tekli seçimde, `Option` tipi ya da seçilmemişse `undefined` olabilir.
   */
  value: Option | undefined;

  /**
   * Seçim değiştiğinde tetiklenen olaydır.
   *
   * Yeni seçilen değer `Option` tipi ya da seçilmemişse `undefined` olarak gelir.
   */
  onChange: (option: Option | undefined) => void;

  /**
   * Bileşenin çoklu seçim modunda olmadığını belirtir.
   *
   * `false` veya belirtilmemiş olabilir.
   */
  multiple?: false;
}

export type Props = {
  /**
   * Seçilebilir seçeneklerin listesi.
   *
   * `Option` tipi elemanlardan oluşan bir dizi olmalıdır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Select options={[{label: "...", value: "..."}]} />
   * ```
   */
  options: Option[];

  /**
   * Arama alanına bir metin girildiğinde tetiklenen olaydır.
   *
   * - `searchText`: Kullanıcının yazdığı arama metni.,
   *
   * Örneğin;
   *
   * ```jsx
   * <Select onSearch={(searchText) => console.log(searchText)} />
   * ```
   */
  onSearch?: (searchText: string) => void;

  /**
   * Bileşen üzerine tıklandığında tetiklenen olaydır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Select onClick={() => {...}} />
   * ```
   */
  onClick?: () => void;

  /**
   * Yeni bir seçenek oluşturulduğunda tetiklenen olaydır.
   *
   * - `option`: Oluşturulan yeni `Option` nesnesi.
   *
   * Örneğin;
   *
   * ```jsx
   * <Select onCreate={(option) => console.log(option)} />
   * ```
   */
  onCreate?: (option: Option) => void;

  /**
   * Bileşenin içinde gösterilecek yer tutucu (placeholder) metni.
   *
   * Örneğin;
   *
   * ```jsx
   * <Select placeholder="..." />
   * ```
   */
  placeholder?: string;
} & (IMultiple | ISingle) &
  IVariant &
  IStatus &
  IBorder &
  IIcon &
  ISize &
  IUpperCase &
  IValidation &
  IDisabled;
