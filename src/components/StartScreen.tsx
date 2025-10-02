import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";
import QuizHeader from "./QuizHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeShop } from "@/contexts/ThemeShopContext";
import { useThemeImageFilter } from "@/hooks/useThemeImageFilter";
import { useTheme } from "@/contexts/ThemeContext";
import quizLogo from "@/assets/quiz-logo.png";
import qLogo from "@/assets/q-logo.png";
import qLogoLight from "@/assets/q-logo-light.png";
import coinIcon from "@/assets/coin-icon.png";

interface StartScreenProps {
  onStart: (difficulty: "easy" | "medium" | "hard") => void;
  onSettings: () => void;
  onShop: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

const StartScreen = ({ onStart, onSettings, onShop, onNavigateToLogin, onNavigateToSignup }: StartScreenProps) => {
  const { t } = useLanguage();
  const { currentUser, logout, deleteAccount } = useAuth();
  const { resetTheme, saveUserProgress } = useThemeShop();
  const { theme } = useTheme();
  const imageFilter = useThemeImageFilter();
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogout = () => {
    // Save all progress before logout
    saveUserProgress();
    console.log("✅ Progress saved before logout");
    
    // Then logout
    logout();
    resetTheme();
    setMenuOpen(false);
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    onNavigateToLogin();
  };

  const handleSignupClick = () => {
    setMenuOpen(false);
    onNavigateToSignup();
  };

  const handleDeleteClick = () => {
    setMenuOpen(false);
    setDeleteDialogOpen(true);
    setPassword1("");
    setPassword2("");
    setPasswordError("");
  };

  const handleDeletePasswordSubmit = () => {
    if (password1 !== password2) {
      setPasswordError("Passwörter stimmen nicht überein");
      return;
    }
    if (!password1 || !password2) {
      setPasswordError("Bitte Passwort eingeben");
      return;
    }
    setDeleteDialogOpen(false);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const success = deleteAccount(password1);
    if (success) {
      setConfirmDialogOpen(false);
      setPassword1("");
      setPassword2("");
    } else {
      setConfirmDialogOpen(false);
      setDeleteDialogOpen(true);
      setPasswordError("Falsches Passwort");
    }
  };
  
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="border-b-4 bg-muted backdrop-blur">
          <QuizHeader onSettings={onSettings} />
          {currentUser && (
            <div className="absolute right-4 top-[5.5rem] md:right-28 md:top-4 flex items-center gap-2 text-foreground font-bold text-xl">
              <img src={coinIcon} alt="Coin" className="h-8 w-8 object-contain transition-all" style={{ filter: imageFilter }} />
              <span className="text-primary">{currentUser.coins}</span>
            </div>
          )}
        </div>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4 text-foreground transition-all hover:scale-110 h-12 w-12 p-1"
            >
              <img 
                src={theme === "light" ? qLogoLight : qLogo} 
                alt="Q Logo" 
                className="h-10 w-10 object-contain transition-all"
                style={{ filter: theme === "light" ? `${imageFilter} contrast(1.15) brightness(0.95) drop-shadow(0 0 1.5px hsl(var(--primary)))` : imageFilter }}
              />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>{t.menu}</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-4">
              {!currentUser ? (
                <>
                  <Button 
                    onClick={handleLoginClick}
                    className="w-full bg-secondary text-secondary-foreground"
                  >
                    {t.login}
                  </Button>
                  <Button 
                    onClick={handleSignupClick}
                    className="w-full bg-secondary text-secondary-foreground"
                  >
                    {t.signup}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full"
                  >
                    {t.logout}
                  </Button>
                  <Button 
                    onClick={handleDeleteClick}
                    variant="outline"
                    className="w-full text-destructive border-destructive hover:bg-destructive/10"
                  >
                    Account löschen
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
        {currentUser && (
          <Button
            onClick={onShop}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-[5.5rem] md:bottom-4 md:top-auto text-foreground transition-all hover:scale-110 h-12 w-12"
          >
            <ShoppingCart className="h-10 w-10" />
          </Button>
        )}
        <div className="flex-1 flex flex-col items-center justify-center w-full px-4 gap-8 bg-background">
          <img 
            src={quizLogo} 
            alt="Quiz App Logo" 
            className="w-80 h-80 mb-4 transition-all"
            style={{ filter: imageFilter }}
          />
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
                  ? "bg-[hsl(38,91%,65%)] text-white border-2 border-[hsl(38,91%,65%)]"
                  : "bg-[hsl(38,91%,65%)]/50 text-white"
              }`}
            >
              {t.medium}
            </Button>
            <Button
              onClick={() => setSelectedDifficulty("hard")}
              className={`h-12 px-6 text-lg ${
                selectedDifficulty === "hard"
                  ? "bg-[hsl(356,98%,55%)] text-white border-2 border-[hsl(356,98%,55%)]"
                  : "bg-[hsl(356,98%,55%)]/50 text-white"
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

      {/* Delete Account Password Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Account löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Bitte gib dein Passwort zweimal ein, um deinen Account zu löschen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password1">Passwort</Label>
              <Input
                id="password1"
                type="password"
                value={password1}
                onChange={(e) => {
                  setPassword1(e.target.value);
                  setPasswordError("");
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password2">Passwort wiederholen</Label>
              <Input
                id="password2"
                type="password"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                  setPasswordError("");
                }}
              />
            </div>
            {passwordError && (
              <p className="text-sm text-destructive">{passwordError}</p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setPassword1("");
              setPassword2("");
              setPasswordError("");
            }}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePasswordSubmit}>
              Weiter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Delete Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bist du sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Möchtest du deinen Account wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setPassword1("");
              setPassword2("");
            }}>Nein</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Ja, Account löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StartScreen;
