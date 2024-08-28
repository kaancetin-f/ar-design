import React from "react";
import { Props } from "./Types";

const Row: React.FC<Props> = ({ children }) => {
  return (
    <div className="row">
      {React.Children.map(children, (child) => (
        <>{child}</>
      ))}
    </div>
  );
};

export default Row;
