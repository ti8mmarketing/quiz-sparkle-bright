import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuizHeader from "./QuizHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeShop, ThemeStyle } from "@/contexts/ThemeShopContext";
import { toast } from "@/hooks/use-toast";
import coinIcon from "@/assets/coin-icon.png";
import { Check } from "lucide-react";

interface ShopScreenProps {
  onBack: () => void;
  onSettings: () => void;
}

const ShopScreen = ({ onBack, onSettings }: ShopScreenProps) => {
  const { t } = useLanguage();
  const [previewTheme, setPreviewTheme] = useState<ThemeStyle | null>(null);
  const { currentUser, addCoins } = useAuth();
  const { purchasedThemes, activeTheme, purchaseTheme, setActiveTheme, getThemePrice } = useThemeShop();

  const themes: { id: ThemeStyle; name: string; colorClass: string }[] = [
    { id: "pink", name: "Pink Style", colorClass: "bg-pink-500" },
    { id: "green", name: "Grüner Style", colorClass: "bg-green-500" },
    { id: "orange", name: "Oranger Style", colorClass: "bg-orange-500" },
    { id: "yellow", name: "Gelber Style", colorClass: "bg-yellow-500" },
  ];

  const handlePurchase = (theme: ThemeStyle) => {
    if (!currentUser) {
      toast({
        title: "Nicht eingeloggt",
        description: "Bitte logge dich ein, um Themes zu kaufen.",
        variant: "destructive",
      });
      return;
    }

    const price = getThemePrice(theme);
    if (currentUser.coins < price) {
      toast({
        title: "Nicht genug Coins",
        description: `Du benötigst ${price} Coins für dieses Theme.`,
        variant: "destructive",
      });
      return;
    }

    const success = purchaseTheme(theme);
    if (success) {
      addCoins(-price);
      toast({
        title: "Theme gekauft!",
        description: `Du hast das ${theme} Theme für ${price} Coins gekauft.`,
      });
    }
  };

  const handleActivate = (theme: ThemeStyle) => {
    setActiveTheme(theme);
    toast({
      title: "Theme aktiviert!",
      description: `Das ${theme} Theme wurde aktiviert.`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <QuizHeader onSettings={onSettings} />
      {currentUser && (
        <div className="absolute right-28 top-4 flex items-center gap-2 text-foreground font-bold text-lg">
          <img src={coinIcon} alt="Coin" className="h-6 w-6 object-contain" />
          <span className="text-primary">{currentUser.coins}</span>
        </div>
      )}
      <Button
        onClick={onBack}
        variant="ghost"
        className="absolute left-4 top-4 text-foreground hover:bg-muted"
      >
        ← Zurück
      </Button>
      
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 max-w-6xl py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">🛒 Theme Shop</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {themes.map((theme) => {
            const isPurchased = purchasedThemes.includes(theme.id);
            const isActive = activeTheme === theme.id;
            const price = getThemePrice(theme.id);

            return (
              <Card 
                key={theme.id} 
                className="p-6 bg-card border-border cursor-pointer transition-all hover:border-primary"
                onMouseEnter={() => setPreviewTheme(theme.id)}
                onMouseLeave={() => setPreviewTheme(null)}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-card-foreground">{theme.name}</h3>
                    {isActive && (
                      <div className="flex items-center gap-1 text-success">
                        <Check className="w-5 h-5" />
                        <span className="text-sm font-semibold">Aktiv</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={`h-24 rounded-lg ${theme.colorClass}`}></div>
                  
                  <div className="flex items-center gap-2">
                    <img src={coinIcon} alt="Coin" className="h-5 w-5 object-contain" />
                    <span className="text-lg font-bold text-primary">{price}</span>
                  </div>

                  {!isPurchased ? (
                    <Button
                      onClick={() => handlePurchase(theme.id)}
                      className="w-full bg-secondary text-secondary-foreground"
                      disabled={!currentUser || currentUser.coins < price}
                    >
                      Kaufen
                    </Button>
                  ) : !isActive ? (
                    <Button
                      onClick={() => handleActivate(theme.id)}
                      className="w-full bg-primary text-primary-foreground"
                    >
                      Aktivieren
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full"
                    >
                      Aktives Theme
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card border-border sticky top-4">
              <h3 className="text-xl font-bold text-card-foreground mb-4">Vorschau</h3>
              <div className={`preview-container ${previewTheme ? `theme-${previewTheme}` : ''}`}>
                <div className="p-4 rounded-lg bg-background border-2 border-border">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-primary mb-2">Frage 1 von 20</h2>
                    <p className="text-lg text-foreground">Was ist die Hauptstadt von Deutschland?</p>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-md bg-muted text-muted-foreground border border-border">
                      Berlin
                    </div>
                    <div className="p-3 rounded-md bg-muted text-muted-foreground border border-border">
                      München
                    </div>
                    <div className="p-3 rounded-md bg-primary text-primary-foreground border border-primary">
                      Hamburg
                    </div>
                    <div className="p-3 rounded-md bg-muted text-muted-foreground border border-border">
                      Köln
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-10 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center font-semibold">
                      Weiter
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {previewTheme ? "Bewege die Maus über ein Theme für eine Vorschau" : "Bewege die Maus über ein Theme"}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
