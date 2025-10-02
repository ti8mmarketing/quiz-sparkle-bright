import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StartScreen from "@/components/StartScreen";
import QuestionCard from "@/components/QuestionCard";
import ScoreScreen from "@/components/ScoreScreen";
import EndScreen from "@/components/EndScreen";
import SettingsScreen from "@/components/SettingsScreen";
import ShopScreen from "@/components/ShopScreen";
import QuizHeader from "@/components/QuizHeader";
import { getQuestionsByLanguage } from "@/data/questions";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useThemeImageFilter } from "@/hooks/useThemeImageFilter";
import coinIcon from "@/assets/coin-icon.png";

type Screen = "start" | "quiz" | "score" | "end" | "settings" | "shop";
type Difficulty = "easy" | "medium" | "hard";

const Index = () => {
  const { addCoins, currentUser } = useAuth();
  const { language } = useLanguage();
  const imageFilter = useThemeImageFilter();
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<Screen>("start");
  const [previousScreen, setPreviousScreen] = useState<Screen>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [filteredQuestions, setFilteredQuestions] = useState(getQuestionsByLanguage(language).filter(q => q.difficulty === "easy"));

  const handleStart = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    const allQuestions = getQuestionsByLanguage(language);
    const filtered = allQuestions.filter(q => q.difficulty === selectedDifficulty);
    setFilteredQuestions(filtered);
    setCurrentScreen("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
      const coinMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
      addCoins(coinMultiplier);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen("score");
    }
  };

  const handleScoreNext = () => {
    setCurrentScreen("end");
  };

  const handleRestart = () => {
    const allQuestions = getQuestionsByLanguage(language);
    const filtered = allQuestions.filter(q => q.difficulty === difficulty);
    setFilteredQuestions(filtered);
    setCurrentScreen("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleHome = () => {
    setCurrentScreen("start");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleSettings = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen("settings");
  };

  const handleBackFromSettings = () => {
    setCurrentScreen(previousScreen);
  };

  const handleShop = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen("shop");
  };

  const handleBackFromShop = () => {
    setCurrentScreen(previousScreen);
  };

  if (currentScreen === "start") {
    return (
      <StartScreen 
        onStart={handleStart} 
        onSettings={handleSettings}
        onShop={handleShop}
        onNavigateToLogin={() => navigate("/login")}
        onNavigateToSignup={() => navigate("/signup")}
      />
    );
  }

  if (currentScreen === "settings") {
    return <SettingsScreen onBack={handleBackFromSettings} />;
  }

  if (currentScreen === "shop") {
    return <ShopScreen onBack={handleBackFromShop} onSettings={handleSettings} />;
  }

  if (currentScreen === "quiz") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center">
        <div className="border-b-4 bg-muted backdrop-blur w-full">
          <QuizHeader showHomeButton onHome={handleHome} onSettings={handleSettings} />
          {currentUser && (
            <div className="absolute right-4 top-[5.5rem] md:right-28 md:top-4 flex items-center gap-2 text-foreground font-bold text-xl">
              <img src={coinIcon} alt="Coin" className="h-8 w-8 object-contain transition-all" style={{ filter: imageFilter }} />
              <span className="text-primary">{currentUser.coins}</span>
            </div>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <QuestionCard
            question={filteredQuestions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={filteredQuestions.length}
          />
        </div>
      </div>
    );
  }

  if (currentScreen === "score") {
    return (
      <ScoreScreen
        score={score}
        totalQuestions={filteredQuestions.length}
        onNext={handleScoreNext}
        onSettings={handleSettings}
      />
    );
  }

  return <EndScreen onRestart={handleRestart} onHome={handleHome} onSettings={handleSettings} />;
};

export default Index;
