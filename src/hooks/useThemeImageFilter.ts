import { useEffect, useState } from "react";
import { useThemeShop } from "@/contexts/ThemeShopContext";

export const useThemeImageFilter = () => {
  const { activeTheme } = useThemeShop();
  const [filterStyle, setFilterStyle] = useState<string>("");

  useEffect(() => {
    const filters: Record<string, string> = {
      default: "hue-rotate(0deg)",
      pink: "hue-rotate(108deg) saturate(1.2)",
      green: "hue-rotate(-105deg) saturate(1.2)",
      orange: "hue-rotate(-190deg) saturate(1.2)",
      blue: "hue-rotate(-20deg) saturate(1.1)",
      purple: "hue-rotate(60deg) saturate(1.2)",
    };

    setFilterStyle(filters[activeTheme] || filters.default);
  }, [activeTheme]);

  return filterStyle;
};
