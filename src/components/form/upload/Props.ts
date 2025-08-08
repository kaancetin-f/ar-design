import { MimeTypes } from "../../../libs/types";
import { IDisabled, IValidation } from "../../../libs/types/IGlobalProps";

interface IMultiple {
  /**
   * Yüklenen dosyalar dizisi.
   *
   * Örneğin;
   *
   * ```jsx
   * <Upload
   *    file={[file1, file2]}
   *    multiple={true}
   *    onChange={(formData, files, isInvalid) => {}}
   * />
   * ```
   */
  files: File[];

  /**
   * Dosya seçimi veya değişikliğinde tetiklenen fonksiyon.
   *
   * @param formData - Dosyalarla oluşturulmuş FormData nesnesi.
   * @param files - Seçilen dosyalar dizisi.
   * @param isInvalidFileExist - Geçersiz dosya olup olmadığını belirtir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Upload
   *    onChange={(formData, files, isInvalid) => {
   *      console.log(files.length, isInvalid);
   *    }}
   * />
   * ```
   */
  onChange: (formData: FormData, files: File[], base64: string[], isInvalidFileExist: boolean) => void;

  /**
   * Çoklu dosya seçiminin aktif olduğunu belirtir.
   *
   * Örneğin;
   * ```jsx
   * <Upload multiple={true} />
   * ```
   */
  // multiple: true;
}

// interface ISingle {
//   /**
//    * Yüklenen tek dosya veya undefined.
//    *
//    * Örneğin;
//    *
//    * ```jsx
//    * <Upload file={selectedFile} />
//    * ```
//    */
//   file: File | undefined;

//   /**
//    * Dosya seçimi veya değişikliğinde tetiklenen fonksiyon.
//    *
//    * @param formData - Dosyayla oluşturulmuş FormData nesnesi veya undefined.
//    * @param files - Seçilen dosya veya null.
//    *
//    * Örneğin;
//    *
//    * ```jsx
//    * <Upload onChange={(formData, file) => console.log(file)} />
//    * ```
//    */
//   onChange: (formData: FormData | undefined, files: File | null, base64: string) => void;

//   /**
//    * Çoklu dosya seçiminin devre dışı olduğunu belirtir.
//    *
//    * Örneğin;
//    *
//    * ```jsx
//    * <Upload multiple={false} />
//    * ```
//    */
//   multiple?: false;
// }

type Props = {
  /**
   * Bileşen ile ilgili açıklayıcı veya gösterilecek metin.
   *
   * Örneğin;
   *
   * ```jsx
   * <Upload text="Dosya yükle" />
   * ```
   */
  text: string;

  /**
   * Kabul edilen dosya türlerinin listesi.
   *
   * Örneğin;
   * ```jsx
   * <Upload allowedTypes={["image/png", "application/pdf"]} />
   * ```
   */
  allowedTypes?: MimeTypes[];

  /**
   * Kabul edilen maksimum dosya boyutu (byte cinsinden).
   *
   * Örneğin;
   *
   * ```jsx
   * <Upload maxSize={1} /> // 1 MB
   * ```
   */
  maxSize?: number;

  type?: "list" | "grid" | "dropzone";

  multiple?: boolean;
} & IMultiple &
  IValidation &
  IDisabled;

export default Props;
