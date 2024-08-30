import { MenuProps } from "../menu/Types";

export type LayoutProps = {
  children: React.ReactNode;
};

export type HeaderProps = {
  logo: string | React.JSX.Element;
  menu: MenuProps[];
};

export type MainProps = {
  children: React.ReactNode;
};

export type AsideProps = {
  menu: MenuProps[];
};

export type SectionProps = {
  children: React.ReactNode;
};
