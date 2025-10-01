import { Home, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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
  
  return (
    <header className="relative w-full py-6">
      {showHomeButton && (
        <Button
          onClick={onHome}
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4 text-foreground hover:bg-muted"
        >
          <Home className="h-6 w-6" />
        </Button>
      )}
      {showSettingsButton && (
        <Button
          onClick={onSettings}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-foreground hover:bg-muted"
        >
          <Settings className="h-6 w-6" />
        </Button>
      )}
      <h1 className="text-center text-4xl font-bold text-primary">
        {t.appTitle}
      </h1>
    </header>
  );
};

export default QuizHeader;
