import { Direction, Status } from "../../../libs/core/application/contexts/Notification";

interface IProps {
  /**
   * Bildirim başlığı.
   *
   * Örneğin;
   *
   * ```jsx
   * <Notification title="Başarılı" />
   * ```
   */
  title: string;

  /**
   * Bildirimin içeriğinde gösterilecek opsiyonel mesaj.
   *
   * Örneğin;
   *
   * ```jsx
   * <Notification message="İşlem başarıyla tamamlandı." />
   * ```
   */
  message?: string;

  /**
   * Bildirimin durumu.
   *
   * `Status` tipinde olmalıdır.
   *
   * Kabul edilen değerler:
   * - `success`: Başarılı durum bildirimi.
   * - `warning`: Uyarı durumu bildirimi.
   * - `information`: Bilgilendirme durumu.
   * - `error`: Hata durumu bildirimi.
   *
   * Örneğin;
   *
   * ```jsx
   * <Notification status="success" />
   * ```
   */
  status: Status | number;

  /**
   * Bildirimin ekranda hangi köşede görüneceği.
   *
   * `Direction` tipinden olmalıdır.
   *
   * Geçerli değerler:
   * - `top-left`: Sol üst köşe
   * - `top-right`: Sağ üst köşe
   * - `bottom-left`: Sol alt köşe
   * - `bottom-right`: Sağ alt köşe
   *
   * Örneğin;
   *
   * ```jsx
   * <Notification direction="top-right" />
   * ```
   */
  direction: Direction;

  /**
   * Bildirimin tetiklenip tetiklenmediğini belirten boolean değer.
   *
   * Örneğin;
   *
   * ```jsx
   * <Notification trigger={true} />
   * ```
   */
  trigger: boolean;
}

export default IProps;
