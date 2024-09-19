"use client";

import React from "react";
import Menu from "../navigation/menu";
import { IHeaderProps } from "./IProps";

const Header: React.FC<IHeaderProps> = ({ logo, menu }) => {
  return (
    <header>
      <div className="ar-header-with-wrap">
        {typeof logo === "string" ? <h1>{logo}</h1> : logo}

        {/* Yatay Menü */}
        {<Menu menu={menu} variant="horizontal" />}
      </div>
    </header>
  );
};

Header.displayName = "Layout.Header";
export default Header;
