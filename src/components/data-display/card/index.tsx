import React from "react";
import { Props } from "./Types";
import Typography from "../typography";
import "../../../assets/css/components/data-display/card/card.css";

const { Title } = Typography;

const Card: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="ar-card">
      <div className="title">
        <Title Level="h4">{title || ""}</Title>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Card;
