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
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("quiz-current-user");
    // Reset theme to default on logout
    localStorage.setItem("quiz-active-theme", "default");
    const root = document.documentElement;
    root.classList.remove("theme-default", "theme-pink", "theme-green", "theme-orange", "theme-blue", "theme-purple", "theme-red", "theme-yellow", "theme-teal", "theme-indigo");
    root.classList.add("theme-default");
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

  return (
    <AuthContext.Provider value={{ currentUser, users, login, signup, logout, addCoins }}>
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
