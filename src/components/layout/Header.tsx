"use client";

import React from "react";
import { IHeaderProps } from "./IProps";
import Menu from "../navigation/menu";

const Header: React.FC<IHeaderProps> = ({ logo, menu }) => {
  return (
    <header>
      <div className="ar-header-with-wrap">
        {typeof logo === "string" ? <h1>{logo}</h1> : logo}

        {/* Yatay Menü */}
        {<Menu data={menu} variant="horizontal" />}
      </div>
    </header>
  );
};

Header.displayName = "Layout.Header";
export default Header;
