"use client";

import React, { JSXElementConstructor, useEffect, useState } from "react";
import { AsideProps, HeaderProps, LayoutProps, SectionProps } from "./Types";
import Footer from "./Footer";
import "../../assest/css/layout/layout.css";
import Header from "./Header";
import Aside from "./Aside";
import Section from "./Section";
import { LayoutProvider } from "../../libs/core/application/contexts/Layout";

const Layout: React.FC<LayoutProps> & {
  Header: React.FC<HeaderProps>;
  Aside: React.FC<AsideProps>;
  Section: React.FC<SectionProps>;
  Footer: React.FC;
} = ({ children }) => {
  // states
  const [layout, setLayout] = useState<
    Partial<{
      header: React.JSX.Element;
      main: Partial<{ aside: React.JSX.Element; section: React.JSX.Element }>;
      footer: React.JSX.Element;
    }>
  >();

  // effects
  useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      const _type = child.type as JSXElementConstructor<any> & { displayName?: string };

      switch (_type.displayName) {
        case "Layout.Header":
          setLayout((layout) => ({ ...layout, header: child }));
          break;
        case "Layout.Aside":
          setLayout((layout) => ({ ...layout, main: { ...layout?.main, aside: child } }));
          break;
        case "Layout.Section":
          setLayout((layout) => ({ ...layout, main: { ...layout?.main, section: child } }));
          break;
        case "Layout.Footer":
          setLayout((layout) => ({ ...layout, footer: child }));
          break;
        default:
          break;
      }
    });
  }, [children]);

  return (
    <div className="ar-layout">
      <LayoutProvider>
        <header className="ar-header">{layout?.header}</header>
        <main>
          {layout?.main?.aside}
          <section>{layout?.main?.section}</section>
        </main>
        <footer>{layout?.footer}</footer>
      </LayoutProvider>
    </div>
  );
};

Layout.Header = Header;
Layout.Aside = Aside;
Layout.Section = Section;
Layout.Footer = Footer;

Layout.displayName = "Layout";
export default Layout;
