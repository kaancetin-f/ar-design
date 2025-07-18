import { IChildren, IStatus, IVariant } from "../../../libs/types/IGlobalProps";

interface IProps extends IChildren, IVariant<{ component: "card" }>, IStatus<{ component: "card" }> {
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
