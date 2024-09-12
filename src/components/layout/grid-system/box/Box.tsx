import React from "react";

const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0 .5rem" }}>
      {children}
    </div>
  );
};

export default Box;
