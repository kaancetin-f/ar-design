"use client";

import React from "react";
import { SiderProps, HeaderProps, LayoutProps, MainProps, SectionProps } from "./Types";
import Footer from "./Footer";
import "../../assets/css/components/layout/layout.css";
import Header from "./Header";
import Section from "./Section";
import { LayoutProvider } from "../../libs/core/application/contexts/Layout";
import Main from "./Main";
import LSider from "./LSider";
import RSider from "./RSider";

const Layout: React.FC<LayoutProps> & {
  Header: React.FC<HeaderProps>;
  Main: React.FC<MainProps>;
  LSider: React.FC<SiderProps>;
  Section: React.FC<SectionProps>;
  RSider: React.FC<SiderProps>;
  Footer: React.FC;
} = ({ children }) => {
  return (
    <LayoutProvider>
      <div className="ar-layout">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return;

          return child;
        })}
      </div>
    </LayoutProvider>
  );
};

Layout.Header = Header;
Layout.Main = Main;
Layout.LSider = LSider;
Layout.Section = Section;
Layout.RSider = RSider;
Layout.Footer = Footer;

Layout.displayName = "Layout";
export default Layout;
