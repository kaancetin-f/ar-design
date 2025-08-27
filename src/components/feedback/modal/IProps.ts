import { IChildren, ISize } from "../../../libs/types/IGlobalProps";
import IPopoverProps from "../../feedback/popover/IProps";

interface IProps extends IChildren, ISize, React.HTMLAttributes<HTMLDivElement> {
  /**
   * Modal'ın açık olup olmadığını kontrol eden ve değiştiren değerler.
   *
   * - `get`: Modal açık mı?
   * - `set`: Aç/kapa işlemini yapan fonksiyon.
   *
   * Örneğin;
   *
   * ```jsx
   * const [isOpen, setIsOpen] = useState(false);
   *
   * <Modal open={{ get: isOpen, set: setIsOpen }} />
   * ```
   */
  open: {
    get: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };

  closePopover?: IPopoverProps;

  /**
   * Modal başlığı.
   *
   * Örneğin;
   *
   * ```jsx
   * <Modal title="Bilgilendirme" />
   * ```
   */
  title?: string;

  /**
   * Modal alt içerik alanı (footer).
   *
   * Genellikle buton veya açıklamalar içerir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Modal footer={<button onClick={onClose}>Kapat</button>} />
   * ```
   */
  footer?: React.ReactNode;

  disableCloseOnBackdrop?: boolean;

  disableCloseOnEsc?: boolean;
}

export default IProps;
