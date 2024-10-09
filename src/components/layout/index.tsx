import React from "react";
import { IHeaderProps, ILayoutProps, IMainProps, ISectionProps } from "./IProps";
import Footer from "./Footer";
import "../../assets/css/components/layout/layout.css";
import Header from "./Header";
import Section from "./Section";
import Main from "./Main";
import LSider from "./LSider";
import RSider from "./RSider";

const Layout: React.FC<ILayoutProps> & {
  Header: React.FC<IHeaderProps>;
  Main: React.FC<IMainProps>;
  LSider: React.FC;
  Section: React.FC<ISectionProps>;
  RSider: React.FC;
  Footer: React.FC;
} = ({ children }) => {
  return (
    <div className="ar-layout">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return;

        return child;
      })}
    </div>
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
