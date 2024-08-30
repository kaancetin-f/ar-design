"use client";

import React from "react";
import { HeaderProps } from "./Types";
import Menu from "../menu";

const Header: React.FC<HeaderProps> = ({ logo, menu }) => {
  return (
    <div className="ar-header-with-wrap">
      {typeof logo === "string" ? <h1>{logo}</h1> : logo}

      {/* Yatay Menü */}
      {<Menu menu={menu} variant="horizontal" />}
    </div>
  );
};

Header.displayName = "Layout.Header";
export default Header;
