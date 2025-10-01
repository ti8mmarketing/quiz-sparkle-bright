import { Home, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeImageFilter } from "@/hooks/useThemeImageFilter";
import coinIcon from "@/assets/coin-icon.png";

interface QuizHeaderProps {
  showHomeButton?: boolean;
  onHome?: () => void;
  showSettingsButton?: boolean;
  onSettings?: () => void;
}

const QuizHeader = ({ 
  showHomeButton = false, 
  onHome,
  showSettingsButton = true,
  onSettings
}: QuizHeaderProps) => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const imageFilter = useThemeImageFilter();
  
  return (
    <header className="relative w-full py-6">
      {showHomeButton && (
        <Button
          onClick={onHome}
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4 text-foreground hover:bg-muted h-12 w-12"
        >
          <Home className="h-8 w-8" />
        </Button>
      )}
      {currentUser && (
        <div className="absolute right-28 top-4 flex items-center gap-2 text-foreground font-bold text-xl">
          <img src={coinIcon} alt="Coin" className="h-8 w-8 object-contain transition-all" style={{ filter: imageFilter }} />
          <span className="text-primary">{currentUser.coins}</span>
        </div>
      )}
      {showSettingsButton && (
        <Button
          onClick={onSettings}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-foreground hover:bg-muted h-12 w-12"
        >
          <Settings className="h-8 w-8" />
        </Button>
      )}
      <h1 className="text-center text-3xl font-bold text-primary">
        {t.appTitle}
      </h1>
    </header>
  );
};

export default QuizHeader;
