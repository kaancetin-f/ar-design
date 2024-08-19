import React, { useRef } from "react";

const Paragraph: React.FC<{ children: string; align?: "left" | "center" | "right"; upperCase?: boolean }> = ({
  children,
  align = "left",
  upperCase = false,
}) => {
  // refs
  let _className = useRef<string>("ar-typography-paragraph").current;

  if (align) _className += ` ${align}`;

  return <p className={_className}>{upperCase ? children.toLocaleUpperCase() : children}</p>;
};

export default Paragraph;
