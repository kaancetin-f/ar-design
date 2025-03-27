"use client";

import React from "react";
import { useLayout } from "../../libs/core/application/hooks";
import { ILSiderProps } from "./IProps";
import Title from "../data-display/typography/title/Title";
import Paragraph from "../data-display/typography/paragraph/Paragraph";

const LSider: React.FC<ILSiderProps> = ({ image, text, footer }) => {
  // hooks
  const { config } = useLayout();
  const sider = config.layout.sider.left;

  if (!sider?.active) return null;

  return (
    <aside className="ar-aside left">
      <div className="logo">
        {image}

        <Title Level="h4" align="center">
          {text}
        </Title>
      </div>

      <div>{sider.element}</div>

      {footer && (
        <footer>
          <Paragraph size="small">{footer}</Paragraph>
        </footer>
      )}
    </aside>
  );
};

LSider.displayName = "Layout.LSider";
export default LSider;
