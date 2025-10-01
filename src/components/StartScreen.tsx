import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuizHeader from "./QuizHeader";
import { useLanguage } from "@/contexts/LanguageContext";

interface StartScreenProps {
  onStart: (difficulty: "easy" | "medium" | "hard") => void;
  onSettings: () => void;
}

const StartScreen = ({ onStart, onSettings }: StartScreenProps) => {
  const { t } = useLanguage();
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <QuizHeader onSettings={onSettings} />
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 gap-8">
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
                ? "bg-[hsl(30,100%,50%)] text-white border-2 border-[hsl(30,100%,50%)]"
                : "bg-[hsl(30,100%,50%)]/50 text-white"
            }`}
          >
            {t.medium}
          </Button>
          <Button
            onClick={() => setSelectedDifficulty("hard")}
            className={`h-12 px-6 text-lg ${
              selectedDifficulty === "hard"
                ? "bg-destructive text-destructive-foreground border-2 border-destructive"
                : "bg-destructive/50 text-destructive-foreground"
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
