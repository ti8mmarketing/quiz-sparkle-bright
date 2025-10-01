import { Button } from "@/components/ui/button";
import QuizHeader from "./QuizHeader";

interface ScoreScreenProps {
  score: number;
  totalQuestions: number;
  onNext: () => void;
}

const ScoreScreen = ({ score, totalQuestions, onNext }: ScoreScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <QuizHeader />
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Dein Score
          </h2>
          <p className="text-5xl font-bold text-primary">
            {score} / {totalQuestions}
          </p>
        </div>
        <Button
          onClick={onNext}
          size="lg"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xl px-12 py-6 h-auto"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ScoreScreen;
