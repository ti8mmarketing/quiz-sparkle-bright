import { Button } from "@/components/ui/button";
import QuizHeader from "./QuizHeader";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScoreScreenProps {
  score: number;
  totalQuestions: number;
  onNext: () => void;
  onSettings: () => void;
}

const ScoreScreen = ({ score, totalQuestions, onNext, onSettings }: ScoreScreenProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <QuizHeader onSettings={onSettings} />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t.yourScore}
          </h2>
          <p className="text-5xl font-bold text-primary">
            {score} / {totalQuestions}
          </p>
        </div>
        <Button
          onClick={onNext}
          size="lg"
          className="bg-secondary text-secondary-foreground w-full max-w-md h-14 text-xl"
        >
          {t.next}
        </Button>
      </div>
    </div>
  );
};

export default ScoreScreen;
