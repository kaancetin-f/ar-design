import React from "react";
import Typography from "../typography";
import "../../../assets/css/components/data-display/card/card.css";
import IProps from "./IProps";

const { Title } = Typography;

const Card: React.FC<IProps> = ({ children, title = "", actions }) => {
  return (
    <div className="ar-card">
      {title && (
        <div className="title">
          <Title Level="h4">{title}</Title>

          <div>{actions}</div>
        </div>
      )}
      <div className="content">{children}</div>
    </div>
  );
};

export default Card;
