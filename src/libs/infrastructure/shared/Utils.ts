import { Border, Icon, Sizes, Status, Variants } from "../../types";

class Utils {
  public GetClassName = (
    variant: Variants = "filled",
    status: Status = "light",
    border: Border = { radius: "sm" },
    size: Sizes = "normal",
    icon?: Icon,
    className?: string
  ) => {
    const classNames: string[] = [variant, status, `border-radius-${border.radius}`];

    if (size) classNames.push(size);

    if (icon && icon.element) {
      classNames.push("icon");
      classNames.push(`icon-${icon.position || "start"}`);
    }

    if (className) classNames.push(className);

    return classNames;
  };

  public GetCookie = (name: string) => {
    if (typeof window === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop()?.split(";").shift();

    return null;
  };

  public GetOS = () => {
    const userAgent = navigator.userAgent;

    // İşletim sistemi bilgilerini tespit etmek için regex kullanıyoruz
    if (userAgent.indexOf("Win") !== -1) return "Windows";
    if (userAgent.indexOf("Mac") !== -1) return "MacOS";
    if (userAgent.indexOf("X11") !== -1) return "UNIX";
    if (userAgent.indexOf("Linux") !== -1) return "Linux";
    if (userAgent.indexOf("Android") !== -1) return "Android";
    if (userAgent.indexOf("like Mac") !== -1) return "iOS";

    return "Bilinmeyen OS";
  };

  public GetOSShortCutIcons = () => {
    switch (this.GetOS()) {
      case "MacOS":
        return "⌘";
      case "Windows":
        return "ctrl";
      default:
        return "";
    }
  };

  public StringFormat = (value: string, ...args: any[]): string => {
    if (args[0].length === 0) return value;

    return value.replace(/{(\d+)}/g, (match: string, number: string) => {
      const index = parseInt(number, 10);

      return typeof args[index] !== "undefined" ? args[index] : match;
    });
  };

  public IsNullOrEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (typeof value === "object" && value !== null && Object.keys(value).length === 0) return true;
    if (Array.isArray(value) && value.length === 0) return true;

    return false;
  };

  public DeepEqual = (obj1: any, obj2: any): boolean => {
    if (Object.is(obj1, obj2)) return true; // Aynı referanssa true döndür

    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
      return false; // Eğer biri obje değilse ve eşit değilse false
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false; // Farklı uzunlukta anahtar varsa false

    return keys1.every((key) => this.DeepEqual(obj1[key], obj2[key])); // Rekürsif karşılaştırma
  };

  public RandomCharacterGenerator = (length: number) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let sonuc = "";

    for (let i = 0; i < length; i++) {
      sonuc += characters[Math.floor(Math.random() * characters.length)];
    }

    return sonuc;
  };
}

export default new Utils();
