interface IProps {
  /**
   * Varsayılan olarak seçili olan sayfa numarası.
   * Eğer belirtilmezse, 1. sayfa varsayılan olarak kabul edilir.
   *
   * Örneğin;
   * ```tsx
   * <Pagination defaultCurrent={3} />
   * ```
   */
  defaultCurrent?: number;

  /**
   * Şu anda aktif olan sayfa numarası.
   */
  currentPage: number;

  /**
   * Toplam kayıt sayısı.
   * Sayfa başına gösterilecek öğe sayısına göre toplam sayfa sayısı hesaplanacaktır.
   */
  totalRecords: number;

  /**
   * Her sayfada gösterilecek kayıt sayısı.
   * Varsayılan değer sağlanmamışsa, genellikle 10 veya 20 olarak kabul edilir.
   */
  perPage?: number;

  /**
   * Sayfa değiştiğinde tetiklenen geri çağırma fonksiyonu.
   *
   * @param currentPage - Kullanıcının seçtiği yeni sayfa numarası.
   */
  onChange: (currentPage: number) => void;
}

export default IProps;
