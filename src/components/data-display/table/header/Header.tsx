import React, { memo } from "react";
import { Actions } from "../IProps";
import ActionButtons from "./ActionButtons";

interface IProps {
  title?: string;
  description?: string;
  actions?: Actions;
}

const Header = ({ title, description, actions }: IProps) => {
  return (
    <div className="header">
      <div className="title">
        <h4>{title}</h4>
        {description && <h5>{description}</h5>}
      </div>

      <div className="actions">{actions && <ActionButtons actions={actions} />}</div>
    </div>
  );
};

export default memo(Header);
