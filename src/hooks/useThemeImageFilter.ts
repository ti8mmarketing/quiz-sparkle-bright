import { useEffect, useState } from "react";
import { useThemeShop } from "@/contexts/ThemeShopContext";

export const useThemeImageFilter = () => {
  const { activeTheme } = useThemeShop();
  const [filterStyle, setFilterStyle] = useState<string>("none");

  useEffect(() => {
    const filters: Record<string, string> = {
      default: "none",
      pink: "hue-rotate(108deg) saturate(1.2)",
      green: "hue-rotate(-105deg) saturate(1.2)",
      orange: "hue-rotate(-190deg) saturate(1.2)",
      blue: "hue-rotate(-20deg) saturate(1.1)",
      purple: "hue-rotate(60deg) saturate(1.2)",
      red: "hue-rotate(-220deg) saturate(1.3)",
      yellow: "hue-rotate(-160deg) saturate(1.4)",
      teal: "hue-rotate(-70deg) saturate(1.2)",
      indigo: "hue-rotate(40deg) saturate(1.2)",
    };

    setFilterStyle(filters[activeTheme] || "none");
  }, [activeTheme]);

  return filterStyle;
};
