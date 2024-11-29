import React from "react";

const Actions: React.FC<{
  children: React.ReactElement | React.ReactElement[];
}> = ({ children }) => <div style={{ display: "flex", flexDirection: "row", gap: "0 .5rem" }}>{children}</div>;

export default Actions;
