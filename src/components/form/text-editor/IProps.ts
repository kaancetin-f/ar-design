import { IColors, IValidation } from "../../../libs/types/IGlobalProps";

export interface IProps<T> extends IValidation, IColors {
  /**
   * Bileşenin isim (name) değeridir.
   *
   * Formlarda veya bileşenlerde tanımlayıcı olarak kullanılır.
   *
   * Örneğin;
   *
   * ```jsx
   * <TextEditor name="email" />
   * ```
   */
  name?: string;

  /**
   * Bileşenin mevcut değeridir.
   */
  value?: string;

  /**
   * Değer değiştiğinde çağrılan fonksiyon.
   *
   * - `value`: Yeni değer. `string` veya `undefined` olabilir.
   *
   * Örneğin;
   *
   * ```jsx
   * <TextEditor onChange={(value)=> console.log(value)} />
   * ```
   */
  onChange: (value?: string) => void;

  /**
   * Bileşenin yüksekliği (piksel cinsinden).
   */
  height?: number;

  /**
   * Dinamik liste özellikleri.
   *
   * - `render.display`: Listede gösterilecek `T` tipindeki nesnenin hangi alanının gösterileceği.
   * - `render.items`: Gösterilecek öğeler dizisi.
   * - `triggerKey`: (Opsiyonel) Dinamik listenin tetiklenmesini sağlayan tuş.
   * - `onTagged`: (Opsiyonel) Etiketlenen öğeler seçildiğinde çağrılan fonksiyon.
   *
   * Örnek kullanım:
   *
   * ```tsx
   * interface IUser {
   *   id: number;
   *   name: string;
   *   email: string;
   * }
   *
   * const users: IUser[] = [
   *   { id: 1, name: "Kaan", email: "kaan@example.com" },
   * ];
   *
   * function handleTagged(taggedItems: IUser[]) {
   *   console.log("Seçilen öğeler:", taggedItems);
   * }
   *
   * const dynamicListProps = {
   *   render: {
   *     display: "name" as keyof IUser,
   *     items: users,
   *   },
   *   triggerKey: "@",
   *   onTagged: handleTagged,
   * };
   *
   * <TextEditor dynamicList={dynamicListProps} />
   * ```
   *
   * Açıklamalar:
   *
   * - `render.display`: Öğe listesinden kullanıcıya gösterilecek alanı belirtir.
   * - `render.items`: Dinamik listede gösterilecek öğelerin dizisidir.
   * - `triggerKey`: Bu karakter yazıldığında dinamik liste açılır.
   * - `onTagged`: Kullanıcı bir öğeyi seçip etiketlediğinde çağrılır ve seçilen öğeleri parametre olarak alır.
   */
  dynamicList?: {
    render: {
      display: keyof T;
      items: T[];
    };
    triggerKey?: string;
    onTagged: (tagged: any[]) => void;
  };

  /**
   * Çoklu dil desteğinin aktif olup olmadığını belirtir.
   *
   * - `true`: Çoklu dil desteği aktif.
   * - `false` veya belirtilmemişse: Devre dışı.
   */
  multilang?: boolean;

  /**
   * Bileşenin placeholder (yer tutucu) metnidir.
   */
  placeholder?: string;
}

export default IProps;
