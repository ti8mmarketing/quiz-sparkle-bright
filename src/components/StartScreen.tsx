import { Button } from "@/components/ui/button";
import QuizHeader from "./QuizHeader";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <QuizHeader />
      <div className="flex-1 flex items-center justify-center">
        <Button
          onClick={onStart}
          size="lg"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xl px-12 py-6 h-auto"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
