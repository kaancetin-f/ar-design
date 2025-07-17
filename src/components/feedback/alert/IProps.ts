import { IBorder, IChildren, IStatus, IVariant } from "../../../libs/types/IGlobalProps";

type message = string | message[];

interface IProps extends IChildren, IVariant<{ component: "alert" }>, IStatus<{ component: "alert" }>, IBorder {
  /**
   * Uyarı mesajı içeriğidir.
   *
   * `string` veya özel `message` tipi olabilir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Alert message="İşlem başarıyla tamamlandı." />
   * ```
   */
  message?: message;

  /**
   * Mesaj içindeki vurgulanacak kelime veya ifadeleri belirtir.
   *
   * Bu kelimeler mesaj içinde bold veya farklı stillerle öne çıkarılabilir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Alert
   *   message="Kritik hata oluştu: sunucuya ulaşılamıyor."
   *   emphasize={["...", "..."]}
   * />
   * ```
   */
  emphasize?: string[];
}

export default IProps;
