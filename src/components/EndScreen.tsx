import { Button } from "@/components/ui/button";
import QuizHeader from "./QuizHeader";

interface EndScreenProps {
  onRestart: () => void;
  onHome: () => void;
}

const EndScreen = ({ onRestart, onHome }: EndScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <QuizHeader />
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <Button
          onClick={onRestart}
          size="lg"
          className="bg-background border-2 border-secondary text-foreground hover:bg-muted text-xl px-12 py-6 h-auto"
        >
          Restart
        </Button>
        <Button
          onClick={onHome}
          size="lg"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xl px-12 py-6 h-auto"
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default EndScreen;
