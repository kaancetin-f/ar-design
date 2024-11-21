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
}

export default new Utils();
