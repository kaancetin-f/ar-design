import { IChildren } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren {
  /**
   * Kart başlığı.
   *
   * Örneğin;
   *
   * ```jsx
   * <Card title="Kullanıcı Bilgileri" />
   * ```
   */
  title?: string;

  /**
   * Kartın sağ üst köşesinde gösterilecek aksiyonlar (buton, menü vb.).
   *
   * Örneğin;
   *
   * ```jsx
   * <Card actions={<button>Düzenle</button>} />
   * ```
   */
  actions?: React.JSX.Element;
}

export default IProps;
