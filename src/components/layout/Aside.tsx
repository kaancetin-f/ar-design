"use client";

import React from "react";
import Menu from "../navigation/menu";
import { AsideProps } from "./Types";
import useLayout from "../../libs/core/application/hooks/useLayout";

const Aside: React.FC<AsideProps> = ({ menu }) => {
  // hooks
  const { options } = useLayout();

  return (
    options?.aside.active && (
      <aside>
        <Menu menu={menu} variant="vertical" />
      </aside>
    )
  );
};

Aside.displayName = "Layout.Aside";
export default Aside;
