import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuizHeader from "./QuizHeader";
import ProfileAvatar from "./ProfileAvatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeShop, ThemeStyle } from "@/contexts/ThemeShopContext";
import { useThemeImageFilter } from "@/hooks/useThemeImageFilter";
import { toast } from "@/hooks/use-toast";
import coinIcon from "@/assets/coin-icon.png";
import { Check, Home } from "lucide-react";

interface ShopScreenProps {
  onBack: () => void;
  onSettings: () => void;
}

const ShopScreen = ({ onBack, onSettings }: ShopScreenProps) => {
  const { t } = useLanguage();
  const [previewTheme, setPreviewTheme] = useState<ThemeStyle | null>(null);
  const [hoveredCard, setHoveredCard] = useState<ThemeStyle | null>(null);
  const { currentUser, addCoins } = useAuth();
  const { purchasedThemes, activeTheme, purchaseTheme, setActiveTheme, getThemePrice, saveUserProgress } = useThemeShop();
  const imageFilter = useThemeImageFilter();

  const handleCardHover = (theme: ThemeStyle) => {
    setHoveredCard(theme);
  };

  const themes: { id: ThemeStyle; name: string; colorClass: string }[] = [
    { id: "default", name: "Standard Style", colorClass: "bg-blue-600" },
    { id: "pink", name: "Pink Style", colorClass: "bg-pink-500" },
    { id: "green", name: "Grüner Style", colorClass: "bg-green-500" },
    { id: "orange", name: "Oranger Style", colorClass: "bg-orange-500" },
    { id: "blue", name: "Hellblauer Style", colorClass: "bg-cyan-400" },
    { id: "purple", name: "Lila Style", colorClass: "bg-purple-500" },
    { id: "red", name: "Roter Style", colorClass: "bg-red-600" },
    { id: "yellow", name: "Gelber Style", colorClass: "bg-yellow-500" },
    { id: "teal", name: "Türkiser Style", colorClass: "bg-teal-500" },
    { id: "indigo", name: "Indigo Style", colorClass: "bg-indigo-600" },
  ];

  const handlePurchase = (theme: ThemeStyle, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleActivate = (theme: ThemeStyle, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTheme(theme);
    toast({
      title: "Theme ausgerüstet!",
      description: `Das ${theme} Theme wurde ausgerüstet.`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="border-b-4 bg-muted backdrop-blur w-full">
        <QuizHeader onSettings={onSettings} />
        {currentUser && (
          <>
            <ProfileAvatar className="absolute left-1/2 -translate-x-1/2 top-[5.5rem] md:left-4 md:translate-x-0 md:top-28" size="md" />
            <div className="absolute right-4 top-[5.5rem] md:right-28 md:top-4 flex items-center gap-2 text-foreground font-bold text-xl">
              <img src={coinIcon} alt="Coin" className="h-8 w-8 object-contain transition-all" style={{ filter: imageFilter }} />
              <span className="text-primary">{currentUser.coins}</span>
            </div>
          </>
        )}
      </div>
      <Button
        onClick={() => {
          saveUserProgress(); // Save before going back
          onBack();
        }}
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 text-foreground transition-all hover:scale-110 h-12 w-12"
      >
        <Home className="h-8 w-8" />
      </Button>
      
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 max-w-6xl py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 md:mb-8">🛒 Design Shop</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1.2fr] lg:grid-cols-3 gap-4 md:gap-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 gap-4 md:gap-6">
          {themes.map((theme) => {
            const isPurchased = purchasedThemes.includes(theme.id);
            const isActive = activeTheme === theme.id;
            const price = getThemePrice(theme.id);

            return (
              <Card 
                key={theme.id} 
                className="p-3 md:p-3 lg:p-4 bg-muted border-border cursor-pointer transition-all hover:border-primary overflow-hidden"
                onMouseEnter={() => {
                  setPreviewTheme(theme.id);
                  handleCardHover(theme.id);
                }}
                onMouseLeave={() => setPreviewTheme(null)}
                onClick={() => {
                  if (hoveredCard === theme.id) {
                    setHoveredCard(null);
                  } else {
                    setHoveredCard(theme.id);
                  }
                }}
              >
                <div className="flex md:flex-col gap-3 overflow-hidden">
                  <div className={`flex flex-col gap-2 md:gap-2 lg:gap-3 min-w-full transition-transform duration-500 ${hoveredCard === theme.id ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-sm lg:text-lg font-bold text-card-foreground">{theme.name}</h3>
                      {isActive && (
                        <div className="flex items-center gap-1 text-success">
                          <Check className="w-5 h-5 md:w-4 md:h-4" />
                          <span className="text-sm md:text-xs font-semibold">Aktiv</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`h-32 md:h-12 lg:h-16 rounded-lg ${theme.colorClass}`}></div>
                    
                    <div className="flex items-center gap-2 md:gap-1.5 lg:gap-2">
                      <img src={coinIcon} alt="Coin" className="h-5 w-5 md:h-4 md:w-4 lg:h-5 lg:w-5 object-contain transition-all" style={{ filter: imageFilter }} />
                      <span className="text-lg md:text-sm lg:text-base font-bold text-primary">{price}</span>
                    </div>

                    {theme.id === "default" ? (
                      isActive ? (
                        <Button
                          disabled
                          className="w-full text-base md:text-xs lg:text-sm py-3 md:py-1.5 lg:py-2"
                        >
                          Ausgerüstet
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => handleActivate(theme.id, e)}
                          className="w-full bg-primary text-primary-foreground text-base md:text-xs lg:text-sm py-3 md:py-1.5 lg:py-2"
                        >
                          Ausrüsten
                        </Button>
                      )
                    ) : !isPurchased ? (
                      <Button
                        onClick={(e) => handlePurchase(theme.id, e)}
                        className="w-full bg-secondary text-secondary-foreground text-base md:text-xs lg:text-sm py-3 md:py-1.5 lg:py-2"
                        disabled={!currentUser || currentUser.coins < price}
                      >
                        Kaufen
                      </Button>
                    ) : !isActive ? (
                      <Button
                        onClick={(e) => handleActivate(theme.id, e)}
                        className="w-full bg-primary text-primary-foreground text-base md:text-xs lg:text-sm py-3 md:py-1.5 lg:py-2"
                      >
                        Ausrüsten
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="w-full text-base md:text-xs lg:text-sm py-3 md:py-1.5 lg:py-2"
                      >
                        Ausgerüstet
                      </Button>
                    )}
                  </div>

                  <div className={`md:hidden min-w-full transition-transform duration-500 ${hoveredCard === theme.id ? '-translate-x-full' : 'translate-x-0'}`}>
                    <div className={`preview-container theme-${theme.id === "default" ? "default" : theme.id}`}>
                      <div className="p-3 rounded-lg bg-background">
                        <h2 className="text-sm font-semibold text-foreground text-center mb-3">
                          Was ist die Hauptstadt von Deutschland?
                        </h2>
                        <div className="grid grid-cols-1 gap-2 mb-3">
                          <Button className="bg-secondary text-secondary-foreground h-8 text-xs">
                            Berlin
                          </Button>
                          <Button className="bg-secondary text-secondary-foreground h-8 text-xs">
                            München
                          </Button>
                          <Button className="bg-secondary text-secondary-foreground h-8 text-xs">
                            Hamburg
                          </Button>
                          <Button className="bg-secondary text-secondary-foreground h-8 text-xs">
                            Köln
                          </Button>
                        </div>
                        <div className="flex justify-center">
                          <Button className="bg-muted text-foreground text-xs">
                            {t.skip}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
          </div>
          
          <div className="hidden md:block lg:col-span-1">
            <Card className="p-3 md:p-4 lg:p-6 bg-muted border-border sticky top-4">
              <h3 className="text-lg md:text-xl font-bold text-card-foreground mb-3 md:mb-4">Vorschau</h3>
              <div className={`preview-container ${previewTheme ? (previewTheme === "default" ? "theme-default" : `theme-${previewTheme}`) : 'theme-default'}`}>
                <div className="p-3 md:p-4 rounded-lg bg-background">
                  <h2 className="text-base md:text-lg lg:text-2xl font-semibold text-foreground text-center mb-4 md:mb-6 lg:mb-8">
                    Was ist die Hauptstadt von Deutschland?
                  </h2>
                  <div className="grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-6">
                    <Button className="bg-secondary text-secondary-foreground h-10 md:h-12 lg:h-16 text-sm md:text-base lg:text-lg">
                      Berlin
                    </Button>
                    <Button className="bg-secondary text-secondary-foreground h-10 md:h-12 lg:h-16 text-sm md:text-base lg:text-lg">
                      München
                    </Button>
                    <Button className="bg-secondary text-secondary-foreground h-10 md:h-12 lg:h-16 text-sm md:text-base lg:text-lg">
                      Hamburg
                    </Button>
                    <Button className="bg-secondary text-secondary-foreground h-10 md:h-12 lg:h-16 text-sm md:text-base lg:text-lg">
                      Köln
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button className="bg-muted text-foreground text-sm md:text-base">
                      {t.skip}
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4 text-center">
                Bewege die Maus über ein Design für eine Vorschau
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
