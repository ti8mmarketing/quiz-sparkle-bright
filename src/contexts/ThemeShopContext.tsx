import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeStyle = "default" | "pink" | "green" | "orange" | "blue" | "purple" | "red" | "yellow" | "teal" | "indigo";

interface ThemeShopContextType {
  purchasedThemes: ThemeStyle[];
  activeTheme: ThemeStyle;
  purchaseTheme: (theme: ThemeStyle) => boolean;
  setActiveTheme: (theme: ThemeStyle) => void;
  resetTheme: () => void;
  getThemePrice: (theme: ThemeStyle) => number;
  saveUserProgress: () => void;
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

  // Listen to storage changes and login events
  useEffect(() => {
    const loadUserThemes = (username: string) => {
      setCurrentUsername(username);
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
    };

    const checkCurrentUser = () => {
      const usersData = localStorage.getItem("quiz-users");
      if (!usersData) {
        setPurchasedThemes(["default"]);
        setActiveThemeState("default");
        applyTheme("default");
        setCurrentUsername("");
        console.log("🔄 No users found - reset to default theme");
        return;
      }
      
      const users = JSON.parse(usersData);
      
      // First try to find user with active theme (logged in user)
      let activeUser = users.find((u: any) => {
        const userActiveTheme = localStorage.getItem(`quiz-active-theme-${u.username}`);
        return userActiveTheme !== null;
      });
      
      // If no user found by theme, check AuthContext current user
      if (!activeUser) {
        const authUsersStr = localStorage.getItem("quiz-users");
        if (authUsersStr) {
          const authUsers = JSON.parse(authUsersStr);
          // Try to find user by checking if they were recently active
          activeUser = authUsers[authUsers.length - 1]; // Last user in array might be current
        }
      }
      
      if (activeUser) {
        loadUserThemes(activeUser.username);
      } else {
        // No active user - apply default theme
        setPurchasedThemes(["default"]);
        setActiveThemeState("default");
        applyTheme("default");
        setCurrentUsername("");
        console.log("🔄 No active user - reset to default theme");
      }
    };

    checkCurrentUser();
    
    // Listen for custom events when user logs in/out
    const handleUserChange = () => {
      checkCurrentUser();
    };
    
    window.addEventListener('user-login', handleUserChange);
    window.addEventListener('user-logout', handleUserChange);
    
    return () => {
      window.removeEventListener('user-login', handleUserChange);
      window.removeEventListener('user-logout', handleUserChange);
    };
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
      // Don't save immediately - only save on logout
      console.log(`🎨 Theme ${theme} equipped (will be saved on logout)`);
    }
  };

  const purchaseTheme = (theme: ThemeStyle): boolean => {
    if (purchasedThemes.includes(theme)) {
      return false;
    }
    const updatedThemes = [...purchasedThemes, theme];
    setPurchasedThemes(updatedThemes);
    
    // IMMEDIATE SAVE to localStorage
    if (currentUsername) {
      const userThemesKey = `quiz-purchased-themes-${currentUsername}`;
      localStorage.setItem(userThemesKey, JSON.stringify(updatedThemes));
      console.log(`✅ Theme ${theme} saved for user ${currentUsername}`);
    } else {
      console.warn("⚠️ No username set, cannot save theme");
    }
    return true;
  };

  const saveUserProgress = () => {
    if (currentUsername) {
      // Save purchased themes
      const userThemesKey = `quiz-purchased-themes-${currentUsername}`;
      localStorage.setItem(userThemesKey, JSON.stringify(purchasedThemes));
      
      // Save active theme
      const userActiveThemeKey = `quiz-active-theme-${currentUsername}`;
      localStorage.setItem(userActiveThemeKey, activeTheme);
      
      console.log(`✅ Progress saved for user ${currentUsername}`);
    }
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
    <ThemeShopContext.Provider value={{ purchasedThemes, activeTheme, purchaseTheme, setActiveTheme, resetTheme, getThemePrice, saveUserProgress }}>
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
