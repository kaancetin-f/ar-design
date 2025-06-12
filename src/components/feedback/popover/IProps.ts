import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren {
  /**
   * Popover başlığı.
   *
   * Örneğin;
   *
   * ```jsx
   * <Popover title="Onay Gerekiyor" />
   * ```
   */
  title?: string;

  /**
   * Popover içinde gösterilecek mesaj metni.
   *
   * Örneğin;
   *
   * ```jsx
   * <Popover message="İşlemi onaylıyor musunuz?" />
   * ```
   */
  message?: string;

  /**
   * Popover içeriği olarak gösterilecek özel React JSX elementi.
   *
   * Örneğin;
   *
   * ```jsx
   * <Popover content={<CustomContent />} />
   * ```
   */
  content?: React.JSX.Element;

  /**
   * Onay veya iptal durumunda tetiklenen geri çağırma fonksiyonu.
   *
   * @param confirm - Kullanıcı onay verdiyse true, iptal ettiyse false.
   *
   * Örneğin;
   *
   * ```jsx
   * <Popover onConfirm={(confirm) => console.log(confirm)} />
   * ```
   */
  onConfirm?: (confirm: boolean) => void;

  /**
   * Popover açıkken sayfa dışında bir yere tıklandığında açık kalsın mı?
   *
   * Örneğin;
   *
   * ```jsx
   * <Popover windowBlur={true} />
   * ```
   */
  windowBlur?: boolean;

  /**
   * Popover genişliği tam genişlikte mi olacak?
   *
   * Örneğin;
   *
   * ```jsx
   * <Popover fullWidth={true} />
   * ```
   */
  fullWidth?: boolean;

  /**
   * Buton yapılandırmaları.
   *
   * - `okButton`: Onay butonunda gösterilecek metin.
   * - `cancelButton`: (Opsiyonel) İptal butonunda gösterilecek metin.
   *
   * Örneğin;
   *
   * ```jsx
   * <Popover config={{ buttons: { okButton: "...", cancelButton: "..." } }} />
   * ```
   */
  config?: {
    buttons: {
      okButton: string;
      cancelButton?: string;
    };
  };
}

export default IProps;
