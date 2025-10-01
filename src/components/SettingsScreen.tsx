import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import QuizHeader from "./QuizHeader";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/data/translations";

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const languages: { value: Language; label: string }[] = [
    { value: "de", label: t.german },
    { value: "en", label: t.english },
    { value: "fr", label: t.french },
    { value: "it", label: t.italian },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <QuizHeader showSettingsButton={false} />
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl px-4 gap-12">
        <h2 className="text-3xl font-semibold text-foreground">{t.settings}</h2>
        
        <div className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-xl text-foreground">
              {t.darkMode}
            </Label>
            <Switch
              id="dark-mode"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-xl text-foreground">{t.language}</Label>
            <div className="grid grid-cols-1 gap-3">
              {languages.map((lang) => (
                <Button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`h-12 text-lg ${
                    language === lang.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={onBack}
          size="lg"
          className="bg-secondary text-secondary-foreground w-full max-w-md h-14 text-xl"
        >
          {t.back}
        </Button>
      </div>
    </div>
  );
};

export default SettingsScreen;
