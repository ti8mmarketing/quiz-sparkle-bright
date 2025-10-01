import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

const QuestionCard = ({ question, onAnswer, onNext }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResults(false);
    setIsSkipped(false);
  }, [question.id]);

  const handleAnswerClick = (index: number) => {
    if (showResults) return;

    setSelectedAnswer(index);
    setShowResults(true);
    const isCorrect = index === question.correctAnswer;
    onAnswer(isCorrect);

    setTimeout(() => {
      onNext();
    }, 2000);
  };

  const handleSkip = () => {
    if (showResults) return;

    setIsSkipped(true);
    setShowResults(true);
    onAnswer(false);

    setTimeout(() => {
      onNext();
    }, 2000);
  };

  const getButtonClass = (index: number) => {
    if (!showResults) {
      return "bg-secondary text-secondary-foreground hover:bg-secondary/90";
    }

    if (index === question.correctAnswer) {
      return "bg-success text-success-foreground";
    }

    if (selectedAnswer === index || isSkipped) {
      return "bg-destructive text-destructive-foreground";
    }

    return "bg-secondary text-secondary-foreground";
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-foreground text-center mb-12">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {question.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={showResults}
            className={`${getButtonClass(index)} h-16 text-lg transition-colors duration-300`}
          >
            {answer}
          </Button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleSkip}
          disabled={showResults}
          className="bg-muted text-foreground hover:bg-muted/80"
        >
          Skip
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
