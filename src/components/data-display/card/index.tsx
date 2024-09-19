import React from "react";
import Typography from "../typography";
import "../../../assets/css/components/data-display/card/card.css";
import IProps from "./IProps";

const { Title } = Typography;

const Card: React.FC<IProps> = ({ children, title = "" }) => {
  return (
    <div className="ar-card">
      <div className="title">
        <Title Level="h4">{title}</Title>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Card;
