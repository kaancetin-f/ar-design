import React from "react";
import { Props } from "./Types";

const Column: React.FC<Props> = ({ children, column, align }) => {
  const ClassName = () => {
    let className: string = Object.entries(column ?? {})
      .map(([key, value]) => `col-${key}-${value}`)
      .join(" ");

    if (align) className += ` ${align}`;

    return className;
  };

  return <div className={ClassName()}>{children}</div>;
};

export default Column;
