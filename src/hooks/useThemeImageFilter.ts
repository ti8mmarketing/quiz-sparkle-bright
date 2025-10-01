import { useEffect, useState } from "react";
import { useThemeShop } from "@/contexts/ThemeShopContext";

export const useThemeImageFilter = () => {
  const { activeTheme } = useThemeShop();
  const [filterStyle, setFilterStyle] = useState<string>("");

  useEffect(() => {
    const filters: Record<string, string> = {
      default: "hue-rotate(0deg) saturate(1) brightness(1)",
      pink: "hue-rotate(290deg) saturate(1.5) brightness(1.1)",
      green: "hue-rotate(100deg) saturate(1.3) brightness(1.05)",
      orange: "hue-rotate(15deg) saturate(1.4) brightness(1.1)",
      blue: "hue-rotate(180deg) saturate(1.2) brightness(1.15)",
      purple: "hue-rotate(260deg) saturate(1.4) brightness(1.1)",
    };

    setFilterStyle(filters[activeTheme] || filters.default);
  }, [activeTheme]);

  return filterStyle;
};
