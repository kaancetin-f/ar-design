import React from "react";
import Typography from "../typography";
import "../../../assets/css/components/data-display/card/styles.css";
import IProps from "./IProps";
import Utils from "../../../libs/infrastructure/shared/Utils";

const { Title } = Typography;

const Card: React.FC<IProps> = ({ children, title = "", actions, status }) => {
  // variables
  const _titleClassName: string[] = ["title"];

  _titleClassName.push(...Utils.GetClassName(undefined, status, undefined, undefined, undefined, undefined, undefined));

  return (
    <div className="ar-card">
      {title && (
        <div className={_titleClassName.map((c) => c).join(" ")}>
          <Title Level="h4">{title}</Title>

          <div>{actions}</div>
        </div>
      )}
      <div className="content">{children}</div>
    </div>
  );
};

export default Card;
