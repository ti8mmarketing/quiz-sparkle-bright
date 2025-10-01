import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Question } from "@/data/questions";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

const QuestionCard = ({ question, onAnswer, onNext }: QuestionCardProps) => {
  const { t } = useLanguage();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setWrongAnswers([]);
    setShowResults(false);
    setIsSkipped(false);
  }, [question.id]);

  const handleAnswerClick = (index: number) => {
    if (showResults) return;

    setSelectedAnswer(index);
    const isCorrect = index === question.correctAnswer;

    if (!isCorrect) {
      if (!wrongAnswers.includes(index)) {
        setWrongAnswers([...wrongAnswers, index]);
      }
      onAnswer(false);
    } else {
      // No points if a wrong answer was clicked before
      const hasWrongAnswers = wrongAnswers.length > 0;
      onAnswer(!hasWrongAnswers);
      setShowResults(true);
      setTimeout(() => {
        onNext();
      }, 2000);
    }
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
    // Show correct answer in green when revealed
    if (showResults && index === question.correctAnswer) {
      return "bg-success text-success-foreground";
    }

    // Show all wrong answers in red when results are shown
    if (showResults && index !== question.correctAnswer) {
      return "bg-destructive text-destructive-foreground";
    }

    // Show wrong answers that were clicked in red
    if (wrongAnswers.includes(index)) {
      return "bg-destructive text-destructive-foreground";
    }

    // Default button color
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
            disabled={showResults && index !== question.correctAnswer}
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
          className="bg-muted text-foreground"
        >
          {t.skip}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
