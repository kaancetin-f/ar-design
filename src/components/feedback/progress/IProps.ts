interface IProps {
  /**
   * İlerleme çubuğunun mevcut değeri.
   * Genellikle 0 ile 100 arasında bir sayı olmalıdır.
   *
   * Örneğin;
   *
   * ```jsx
   * <Progress value={75} />
   * ```
   */
  value: number;

  /**
   * İlerleme çubuğunun ters yönde dolmasını sağlar.
   * Varsayılan olarak false'tur.
   *
   * Örneğin;
   *
   * ```jsx
   * <Progress value={50} reverse={true} />
   * ```
   */
  reverse?: boolean;

  /**
   * İlerleme değerinin görünür olup olmadığını belirler.
   * Varsayılan olarak true olabilir.
   *
   * Örneğin;
   *
   * ```jsx
   * <Progress value={30} isVisibleValue={false} />
   * ```
   */
  isVisibleValue?: boolean;
}

export default IProps;
