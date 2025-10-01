import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizHeaderProps {
  showHomeButton?: boolean;
  onHome?: () => void;
}

const QuizHeader = ({ showHomeButton = false, onHome }: QuizHeaderProps) => {
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
      <h1 className="text-center text-4xl font-bold text-primary">
        Quizz-App
      </h1>
    </header>
  );
};

export default QuizHeader;
