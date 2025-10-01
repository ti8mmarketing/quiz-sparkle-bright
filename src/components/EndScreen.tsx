import { Button } from "@/components/ui/button";
import QuizHeader from "./QuizHeader";
import { useLanguage } from "@/contexts/LanguageContext";

interface EndScreenProps {
  onRestart: () => void;
  onHome: () => void;
  onSettings: () => void;
}

const EndScreen = ({ onRestart, onHome, onSettings }: EndScreenProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <QuizHeader onSettings={onSettings} />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 pb-20">
        <Button
          onClick={onRestart}
          size="lg"
          className="bg-background border-2 border-secondary text-foreground hover:bg-muted w-full max-w-md h-14 text-xl"
        >
          {t.restart}
        </Button>
        <Button
          onClick={onHome}
          size="lg"
          className="bg-secondary text-secondary-foreground w-full max-w-md h-14 text-xl"
        >
          {t.home}
        </Button>
      </div>
    </div>
  );
};

export default EndScreen;
