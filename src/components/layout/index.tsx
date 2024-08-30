import React from "react";
import { AsideProps, HeaderProps, LayoutProps, MainProps, SectionProps } from "./Types";
import Footer from "./Footer";
import "../../assest/css/layout/layout.css";
import Header from "./Header";
import Aside from "./Aside";
import Main from "./Main";
import Section from "./Section";
import { LayoutProvider } from "../../libs/core/application/contexts/Layout";

const Layout: React.FC<LayoutProps> & {
  Header: React.FC<HeaderProps>;
  Main: React.FC<MainProps>;
  Aside: React.FC<AsideProps>;
  Section: React.FC<SectionProps>;
  Footer: React.FC;
} = ({ children }) => (
  <div className="ar-layout">
    <LayoutProvider>{children}</LayoutProvider>
  </div>
);

Layout.Header = Header;
Layout.Main = Main;
Layout.Aside = Aside;
Layout.Section = Section;
Layout.Footer = Footer;

Layout.displayName = "Layout";
export default Layout;
