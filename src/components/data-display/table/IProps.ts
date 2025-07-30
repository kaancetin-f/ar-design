import React from "react";
import { MimeTypes, TableColumnType } from "../../../libs/types";
import { IChildren } from "../../../libs/types/IGlobalProps";
import { FilterOperator } from "../../../libs/infrastructure/shared/Enums";

export type Operator =
  | "Contains"
  | "DoesNotContains"
  | "Equals"
  | "DoesNotEquals"
  | "BeginsWith"
  | "EndsWith"
  | "Blank"
  | "NotBlank";

export type FilterValue = {
  /**
   * Filtre değeri olabilir: string, number veya boolean.
   */
  value: string | number | boolean;

  /**
   * Uygulanacak filtre operatörü.
   */
  operator: FilterOperator;
};

export type SearchedParam = { [key: string]: FilterValue | FilterValue[] };

export type Config = {
  /**
   * Verilerin sunucu tarafında mı işlendiğini belirtir.
   */
  isServerSide?: boolean;

  /**
   * Tablo içinde arama özelliğinin aktif olup olmadığı.
   */
  isSearchable?: boolean;

  /**
   * Kaydırma özelliği ve maksimum yüksekliği.
   */
  scroll?: {
    /**
     * Maksimum tablo yüksekliği (piksel cinsinden).
     */
    maxHeight: number;
  };

  /**
   * Alt satır (subrow) özellikleri.
   */
  subrow?: {
    /**
     * Alt satırın otomatik açılıp açılmayacağı.
     */
    openAutomatically?: boolean;

    /**
     * Alt satırı açmak için seçici (CSS selector) tanımı.
     */
    selector?: string;

    /**
     * Alt satır açma butonunun gösterilip gösterilmeyeceği.
     */
    button?: boolean;
  };

  isTreeView?: boolean;
};

type ImportActionType = {
  /**
   * Import butonunun üzerine gelindiğinde gösterilecek açıklayıcı metin.
   */
  tooltip: string;

  /**
   * Kabul edilen dosya türleri.
   */
  allowedTypes?: MimeTypes[];

  /**
   * Butonun önünde gösterilecek içerik.
   */
  prefixItem?: React.ReactNode;

  /**
   * Butonun arkasında gösterilecek içerik.
   */
  suffixItem?: React.ReactNode;

  /**
   * Dosya import işlemi tetiklendiğinde çağrılan fonksiyon.
   *
   * @param formData - Dosyaları içeren FormData nesnesi (undefined olabilir).
   * @param files - Seçilen dosyalar dizisi.
   */
  onClick: (formData: FormData | undefined, files: File[]) => void;
};

type CreateActionType = {
  /**
   * Create butonunun üzerine gelindiğinde gösterilecek açıklayıcı metin.
   */
  tooltip: string;

  /**
   * Butona tıklanıldığında tetiklenen fonksiyon.
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

interface IProps<T> extends IChildren {
  /**
   * Tablo başlığı.
   *
   * Örneğin;
   *
   * ```jsx
   * <Table title="..." />
   * ```
   */
  title?: string;

  /**
   * Tabloya ait açıklama veya alt metin.
   */
  description?: string;

  /**
   * Tabloya verilecek veri dizisi.
   */
  data: T[];

  /**
   * Tablo kolonlarının tanımı.
   */
  columns: TableColumnType<T>[];

  /**
   * Tablo üzerindeki eylem butonları.
   */
  actions?: {
    /**
     * Dosya import işlemi için buton ayarları.
     */
    import?: ImportActionType;

    /**
     * Yeni kayıt oluşturma butonu ayarları.
     */
    create?: CreateActionType;
  };

  /**
   * Seçili satırlar değiştiğinde çağrılan fonksiyon.
   *
   * @param selectionItems - Seçilen satırların dizisi.
   */
  selections?: (selectionItems: T[]) => void;

  /**
   * Daha önce seçilmiş satırlar.
   */
  previousSelections?: T[];

  /**
   * Arama parametreleri ve sorgu değiştiğinde çağrılan fonksiyon.
   *
   * @param params - Arama parametreleri veya null.
   * @param query - Arama sorgu metni.
   * @param operator - Kullanılan filtre operatörü.
   */
  searchedParams?: (params: SearchedParam | null, query: string, operator: FilterOperator) => void;

  onEditable?: (item: T) => void;

  /**
   * Sayfalama ayarları.
   */
  pagination?: {
    /**
     * Toplam kayıt sayısı.
     */
    totalRecords: number;

    /**
     * Sayfa başına gösterilecek kayıt sayısı.
     */
    perPage: number;

    /**
     * Sayfa değiştirildiğinde tetiklenen fonksiyon.
     *
     * @param currentPage - Yeni sayfa numarası.
     */
    onChange?: (currentPage: number) => void;
  };

  /**
   * Tablo yapılandırma ayarları.
   */
  config?: Config;
}

export default IProps;
