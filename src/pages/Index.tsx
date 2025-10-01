import { useState } from "react";
import StartScreen from "@/components/StartScreen";
import QuestionCard from "@/components/QuestionCard";
import ScoreScreen from "@/components/ScoreScreen";
import EndScreen from "@/components/EndScreen";
import QuizHeader from "@/components/QuizHeader";
import { questions } from "@/data/questions";

type Screen = "start" | "quiz" | "score" | "end";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setCurrentScreen("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen("score");
    }
  };

  const handleScoreNext = () => {
    setCurrentScreen("end");
  };

  const handleRestart = () => {
    setCurrentScreen("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleHome = () => {
    setCurrentScreen("start");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  if (currentScreen === "start") {
    return <StartScreen onStart={handleStart} />;
  }

  if (currentScreen === "quiz") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center">
        <QuizHeader showHomeButton onHome={handleHome} />
        <div className="flex-1 flex items-center justify-center w-full">
          <QuestionCard
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </div>
      </div>
    );
  }

  if (currentScreen === "score") {
    return (
      <ScoreScreen
        score={score}
        totalQuestions={questions.length}
        onNext={handleScoreNext}
      />
    );
  }

  return <EndScreen onRestart={handleRestart} onHome={handleHome} />;
};

export default Index;
