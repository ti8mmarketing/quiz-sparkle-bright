import { Button } from "@/components/ui/button";
import QuizHeader from "./QuizHeader";
import { useLanguage } from "@/contexts/LanguageContext";

interface StartScreenProps {
  onStart: () => void;
  onSettings: () => void;
}

const StartScreen = ({ onStart, onSettings }: StartScreenProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <QuizHeader onSettings={onSettings} />
      <div className="flex-1 flex items-center justify-center w-full px-4">
        <Button
          onClick={onStart}
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
