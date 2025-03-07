import React from "react";
import Typography from "../typography";
import "../../../assets/css/components/data-display/paper/styles.css";

const { Title } = Typography;

const Paper: React.FC<{ children: React.ReactNode; title?: string; action?: React.ReactNode }> = ({
  children,
  title,
  action,
}) => {
  return (
    <div className="ar-paper">
      {(title || action) && (
        <div className="header">
          {title && <Title Level="h3">{title}</Title>}

          {action && <div className="actions-field">{action}</div>}
        </div>
      )}

      <div className="content">{children}</div>
    </div>
  );
};

export default Paper;
