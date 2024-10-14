import React from "react";
import IProps from "./IProps";
import "../../../assets/css/components/feedback/modal/modal.css";
import Typography from "../../data-display/typography";

const { Title } = Typography;

const Modal: React.FC<IProps> = ({ children, title, size = "normal", footer }) => {
  // refs
  const _modalClassName: string[] = ["ar-modal", size];

  return (
    <div className="ar-modal-wrapper">
      <div className={_modalClassName.map((c) => c).join(" ")} role="dialog">
        <div className="header">
          <Title Level="h3">{title}</Title>

          <div className="close">x</div>
        </div>

        <div className="content">{children}</div>

        {footer && <div className="footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
