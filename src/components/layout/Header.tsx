"use client";

import React from "react";
import { IHeaderProps } from "./IProps";

const Header: React.FC<IHeaderProps> = ({ logoWrapper, actions }) => {
  return (
    <header>
      <div className="ar-header-with-wrap">
        <div className="logo-wrapper">
          {logoWrapper?.image && logoWrapper.image}
          {logoWrapper?.text && <h3>{logoWrapper.text}</h3>}
        </div>

        {/* Yatay Menü */}
        {actions && actions}
      </div>
    </header>
  );
};

Header.displayName = "Layout.Header";
export default Header;
