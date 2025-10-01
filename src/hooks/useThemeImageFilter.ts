import { useEffect, useState } from "react";
import { useThemeShop } from "@/contexts/ThemeShopContext";

export const useThemeImageFilter = () => {
  const { activeTheme } = useThemeShop();
  const [filterStyle, setFilterStyle] = useState<string>("");

  useEffect(() => {
    const filters: Record<string, string> = {
      default: "hue-rotate(0deg) saturate(1) brightness(1)",
      pink: "hue-rotate(310deg) saturate(2) brightness(1.2)",
      green: "hue-rotate(95deg) saturate(1.8) brightness(1.1)",
      orange: "hue-rotate(10deg) saturate(1.9) brightness(1.2)",
      blue: "hue-rotate(180deg) saturate(1.6) brightness(1.3)",
      purple: "hue-rotate(260deg) saturate(1.8) brightness(1.2)",
    };

    setFilterStyle(filters[activeTheme] || filters.default);
  }, [activeTheme]);

  return filterStyle;
};
