import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import QuizHeader from "./QuizHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeShop } from "@/contexts/ThemeShopContext";
import { useThemeImageFilter } from "@/hooks/useThemeImageFilter";
import quizLogo from "@/assets/quiz-logo.png";
import qLogo from "@/assets/q-logo.png";
import coinIcon from "@/assets/coin-icon.png";

interface StartScreenProps {
  onStart: (difficulty: "easy" | "medium" | "hard") => void;
  onSettings: () => void;
  onShop: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

const StartScreen = ({ onStart, onSettings, onShop, onNavigateToLogin, onNavigateToSignup }: StartScreenProps) => {
  const { t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const { resetTheme } = useThemeShop();
  const imageFilter = useThemeImageFilter();
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    resetTheme();
    setMenuOpen(false);
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    onNavigateToLogin();
  };

  const handleSignupClick = () => {
    setMenuOpen(false);
    onNavigateToSignup();
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b-4 bg-muted backdrop-blur">
        <QuizHeader onSettings={onSettings} />
        {currentUser && (
          <div className="absolute right-4 top-[5rem] md:top-[5.5rem] flex items-center gap-2 text-foreground font-bold text-xl">
            <img src={coinIcon} alt="Coin" className="h-8 w-8 object-contain transition-all" style={{ filter: imageFilter }} />
            <span className="text-primary">{currentUser.coins}</span>
          </div>
        )}
      </div>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 text-foreground transition-all hover:scale-110 h-12 w-12 p-1"
          >
            <img 
              src={qLogo} 
              alt="Q Logo" 
              className="h-10 w-10 object-contain transition-all"
              style={{ filter: imageFilter }}
            />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>{t.menu}</SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col gap-4">
            {!currentUser ? (
              <>
                <Button 
                  onClick={handleLoginClick}
                  className="w-full bg-secondary text-secondary-foreground"
                >
                  {t.login}
                </Button>
                <Button 
                  onClick={handleSignupClick}
                  className="w-full bg-secondary text-secondary-foreground"
                >
                  {t.signup}
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
                {t.logout}
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
      {currentUser && (
        <Button
          onClick={onShop}
          variant="ghost"
          size="icon"
          className="absolute left-4 bottom-4 text-foreground transition-all hover:scale-110 h-12 w-12"
        >
          <ShoppingCart className="h-10 w-10" />
        </Button>
      )}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 gap-8 bg-background">
        <img 
          src={quizLogo} 
          alt="Quiz App Logo" 
          className="w-80 h-80 mb-4 transition-all"
          style={{ filter: imageFilter }}
        />
        <div className="flex gap-4 mb-4">
          <Button
            onClick={() => setSelectedDifficulty("easy")}
            className={`h-12 px-6 text-lg ${
              selectedDifficulty === "easy"
                ? "bg-success text-success-foreground border-2 border-success"
                : "bg-success/50 text-success-foreground"
            }`}
          >
            {t.easy}
          </Button>
          <Button
            onClick={() => setSelectedDifficulty("medium")}
            className={`h-12 px-6 text-lg ${
              selectedDifficulty === "medium"
                ? "bg-[hsl(38,91%,65%)] text-white border-2 border-[hsl(38,91%,65%)]"
                : "bg-[hsl(38,91%,65%)]/50 text-white"
            }`}
          >
            {t.medium}
          </Button>
          <Button
            onClick={() => setSelectedDifficulty("hard")}
            className={`h-12 px-6 text-lg ${
              selectedDifficulty === "hard"
                ? "bg-[hsl(356,98%,55%)] text-white border-2 border-[hsl(356,98%,55%)]"
                : "bg-[hsl(356,98%,55%)]/50 text-white"
            }`}
          >
            {t.hard}
          </Button>
        </div>
        <Button
          onClick={() => onStart(selectedDifficulty)}
          size="lg"
          className="bg-secondary text-secondary-foreground w-full max-w-md h-14 text-xl"
        >
          {t.start}
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
