import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  password: string;
  coins: number;
  activeTheme?: string;
}

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
  addCoins: (amount: number) => void;
  deleteAccount: (password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("quiz-users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    // Clear current user session on page reload
    setCurrentUser(null);
  }, []);

  const signup = (username: string, password: string): boolean => {
    if (users.some(u => u.username === username)) {
      return false;
    }
    const newUser: User = { username, password, coins: 0 };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("quiz-users", JSON.stringify(updatedUsers));
    
    // If Admin account, unlock all themes
    if (username === "Admin" && password === "Admin") {
      const allThemes = ["default", "pink", "green", "orange", "blue", "purple", "red", "yellow", "teal", "indigo"];
      localStorage.setItem("quiz-purchased-themes-Admin", JSON.stringify(allThemes));
    }
    
    return true;
  };

  const login = (username: string, password: string): boolean => {
    // Get fresh user data from localStorage to ensure we have latest coins
    const storedUsers = localStorage.getItem("quiz-users");
    const allUsers = storedUsers ? JSON.parse(storedUsers) : users;
    
    const user = allUsers.find((u: User) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      
      // Update users state with fresh data
      setUsers(allUsers);
      
      // Load user's theme preferences
      const userActiveTheme = localStorage.getItem(`quiz-active-theme-${username}`);
      if (userActiveTheme) {
        const root = document.documentElement;
        root.classList.remove("theme-default", "theme-pink", "theme-green", "theme-orange", "theme-blue", "theme-purple", "theme-red", "theme-yellow", "theme-teal", "theme-indigo");
        root.classList.add(`theme-${userActiveTheme}`);
      }
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('user-login'));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser) {
      const username = currentUser.username;
      
      // Save current user data before logout
      const updatedUsers = users.map(u => 
        u.username === currentUser.username ? currentUser : u
      );
      setUsers(updatedUsers);
      localStorage.setItem("quiz-users", JSON.stringify(updatedUsers));
      
      console.log(`✅ User data saved for ${username} before logout`);
    }
    
    setCurrentUser(null);
    
    // Keep theme data in localStorage for the user
    // Only reset the visual theme to default
    const root = document.documentElement;
    root.classList.remove("theme-default", "theme-pink", "theme-green", "theme-orange", "theme-blue", "theme-purple", "theme-red", "theme-yellow", "theme-teal", "theme-indigo");
    root.classList.add("theme-default");
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('user-logout'));
  };

  const addCoins = (amount: number) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, coins: currentUser.coins + amount };
      setCurrentUser(updatedUser);
      
      const updatedUsers = users.map(u => 
        u.username === currentUser.username ? updatedUser : u
      );
      setUsers(updatedUsers);
      
      localStorage.setItem("quiz-users", JSON.stringify(updatedUsers));
    }
  };

  const deleteAccount = (password: string): boolean => {
    if (!currentUser) return false;
    
    // Verify password
    if (currentUser.password !== password) {
      return false;
    }
    
    const username = currentUser.username;
    
    // Remove user from users array
    const updatedUsers = users.filter(u => u.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem("quiz-users", JSON.stringify(updatedUsers));
    
    // Remove user-specific data
    localStorage.removeItem(`quiz-purchased-themes-${username}`);
    localStorage.removeItem(`quiz-active-theme-${username}`);
    
    // Logout
    setCurrentUser(null);
    
    // Reset theme to default
    const root = document.documentElement;
    root.classList.remove("theme-default", "theme-pink", "theme-green", "theme-orange", "theme-blue", "theme-purple", "theme-red", "theme-yellow", "theme-teal", "theme-indigo");
    root.classList.add("theme-default");
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, signup, logout, addCoins, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
