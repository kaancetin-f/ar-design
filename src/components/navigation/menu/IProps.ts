import React from "react";
import { MenuItemVariants, MenuProps } from "../../../libs/types";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Menüde gösterilecek öğeler listesi.
   *
   * Örneğin;
   *
   * ```jsx
   * <Menu data={[
   *   { render: "Anasayfa", icon: SVGElement | HTMLImageElement },
   *   { render: <b>Hakkımızda</b>, type: "group", submenu: [{ render: "Ekibimiz" }] }
   * ]} />
   * ```
   */
  data: MenuProps[];

  /**
   * Menü öğelerinin varyantı (stili).
   *
   * - `vertical`: Stil türünü belirtir ("filled" | "outlined" | "dashed" | "borderless").
   * - `horizontal`: Bileşenin soluna içerik ekler (örneğin ₺, %, vb.).
   * - `after`: Bileşenin sağına içerik ekler.
   *
   * Örneğin;
   *
   * ```jsx
   * <Menu variant="vertical" />
   * ```
   */
  variant?: MenuItemVariants;
}

export default IProps;
