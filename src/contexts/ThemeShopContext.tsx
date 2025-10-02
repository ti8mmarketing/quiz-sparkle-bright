import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeStyle = "default" | "pink" | "green" | "orange" | "blue" | "purple" | "red" | "yellow" | "teal" | "indigo";

interface ThemeShopContextType {
  purchasedThemes: ThemeStyle[];
  activeTheme: ThemeStyle;
  purchaseTheme: (theme: ThemeStyle) => boolean;
  setActiveTheme: (theme: ThemeStyle) => void;
  resetTheme: () => void;
  getThemePrice: (theme: ThemeStyle) => number;
}

const ThemeShopContext = createContext<ThemeShopContextType | undefined>(undefined);

const themePrices: Record<ThemeStyle, number> = {
  default: 0,
  pink: 10,
  green: 20,
  orange: 30,
  blue: 40,
  purple: 50,
  red: 60,
  yellow: 70,
  teal: 80,
  indigo: 90,
};

export const ThemeShopProvider = ({ children }: { children: ReactNode }) => {
  const [purchasedThemes, setPurchasedThemes] = useState<ThemeStyle[]>(["default"]);
  const [activeTheme, setActiveThemeState] = useState<ThemeStyle>("default");
  const [currentUsername, setCurrentUsername] = useState<string>("");

  useEffect(() => {
    // Check if there's a logged in user
    const user = localStorage.getItem("quiz-current-user");
    const username = user ? JSON.parse(user).username : "";
    setCurrentUsername(username);

    if (username) {
      // Load user-specific purchased themes
      const userThemesKey = `quiz-purchased-themes-${username}`;
      const storedPurchased = localStorage.getItem(userThemesKey);
      const purchased = storedPurchased ? JSON.parse(storedPurchased) : ["default"];
      setPurchasedThemes(purchased);
      
      const userActiveThemeKey = `quiz-active-theme-${username}`;
      const storedActive = localStorage.getItem(userActiveThemeKey);
      if (storedActive && purchased.includes(storedActive)) {
        setActiveThemeState(storedActive as ThemeStyle);
        applyTheme(storedActive as ThemeStyle);
      } else {
        setActiveThemeState("default");
        applyTheme("default");
      }
    } else {
      // No user logged in, reset to default
      setPurchasedThemes(["default"]);
      setActiveThemeState("default");
      applyTheme("default");
    }
  }, []);

  const applyTheme = (theme: ThemeStyle) => {
    const root = document.documentElement;
    root.classList.remove("theme-default", "theme-pink", "theme-green", "theme-orange", "theme-blue", "theme-purple", "theme-red", "theme-yellow", "theme-teal", "theme-indigo");
    root.classList.add(`theme-${theme}`);
  };

  const setActiveTheme = (theme: ThemeStyle) => {
    if (purchasedThemes.includes(theme)) {
      setActiveThemeState(theme);
      applyTheme(theme);
      if (currentUsername) {
        const userActiveThemeKey = `quiz-active-theme-${currentUsername}`;
        localStorage.setItem(userActiveThemeKey, theme);
      }
    }
  };

  const purchaseTheme = (theme: ThemeStyle): boolean => {
    if (purchasedThemes.includes(theme)) {
      return false;
    }
    const updatedThemes = [...purchasedThemes, theme];
    setPurchasedThemes(updatedThemes);
    if (currentUsername) {
      const userThemesKey = `quiz-purchased-themes-${currentUsername}`;
      localStorage.setItem(userThemesKey, JSON.stringify(updatedThemes));
    }
    return true;
  };

  const getThemePrice = (theme: ThemeStyle): number => {
    return themePrices[theme];
  };

  const resetTheme = () => {
    setActiveThemeState("default");
    applyTheme("default");
    if (currentUsername) {
      const userActiveThemeKey = `quiz-active-theme-${currentUsername}`;
      localStorage.setItem(userActiveThemeKey, "default");
    }
  };

  return (
    <ThemeShopContext.Provider value={{ purchasedThemes, activeTheme, purchaseTheme, setActiveTheme, resetTheme, getThemePrice }}>
      {children}
    </ThemeShopContext.Provider>
  );
};

export const useThemeShop = () => {
  const context = useContext(ThemeShopContext);
  if (!context) {
    throw new Error("useThemeShop must be used within ThemeShopProvider");
  }
  return context;
};
