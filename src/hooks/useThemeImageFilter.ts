import { useEffect, useState } from "react";
import { useThemeShop } from "@/contexts/ThemeShopContext";

export const useThemeImageFilter = () => {
  const { activeTheme } = useThemeShop();
  const [filterStyle, setFilterStyle] = useState<string>("");

  useEffect(() => {
    const filters: Record<string, string> = {
      default: "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(200deg) brightness(118%) contrast(119%)",
      pink: "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(310deg) brightness(118%) contrast(119%)",
      green: "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(95deg) brightness(118%) contrast(119%)",
      orange: "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(10deg) brightness(118%) contrast(119%)",
      blue: "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(175deg) brightness(118%) contrast(119%)",
      purple: "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(260deg) brightness(118%) contrast(119%)",
    };

    setFilterStyle(filters[activeTheme] || filters.default);
  }, [activeTheme]);

  return filterStyle;
};
