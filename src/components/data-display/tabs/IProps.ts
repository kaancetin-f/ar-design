import { TabProps } from "../../../libs/types";

interface IProps {
  /**
   * Tab'ları temsil eden dizi.
   * Her bir eleman `TabProps` tipinde olmalıdır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Component
   *   tabs={[
   *     { title: "Ana Sayfa", content: <HomePage />, config: { canBeClosed: false } },
   *     { title: "Profil", content: <Profile />, config: { canBeClosed: true } },
   *   ]}
   * />
   * ```
   */
  tabs: TabProps[];

  /**
   * Aktif olarak seçili olan tab'ın indeksi.
   *
   * Örneğin;
   *
   * ```jsx
   * <Tabs activeTab={0} />
   * ```
   */
  activeTab?: number;

  /**
   * Tab değiştirildiğinde çağrılan fonksiyon.
   *
   * @param currentTab - Yeni seçilen tab'ın indeksi.
   *
   * Örneğin;
   *
   * ```jsx
   * <Tabs onChange={(currentTab) => console.log(currentTab)} />
   * ```
   */
  onChange?: (currentTab: number) => void;

  /**
   * Tab kapatıldığında çağrılan fonksiyon.
   *
   * @param closeTab - Kapatılan tab'ın indeksi.
   *
   * Örneğin;
   *
   * ```jsx
   * <Tabs onClose={(closeTab) => console.log(closeTab)} />
   * ```
   */
  onClose?: (closeTab: number) => void;
}

export default IProps;
