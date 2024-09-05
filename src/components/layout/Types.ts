import { MenuProps } from "../navigation/menu/Types";

export type LayoutProps = {
  children: React.ReactNode;
};

export type HeaderProps = {
  logo: string | React.JSX.Element;
  menu: MenuProps[];
};

export type AsideProps = {
  menu: MenuProps[];
};

export type SectionProps = {
  children: React.ReactNode;
};
