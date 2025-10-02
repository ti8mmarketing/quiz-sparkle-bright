import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import QuizHeader from "@/components/QuizHeader";
import { useToast } from "@/hooks/use-toast";
import { Home, Camera, Image as ImageIcon } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.jpg";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const { signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePicture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup(username, password, profilePicture || undefined)) {
      toast({
        title: t.signupSuccess,
        description: t.signupSuccessDesc,
      });
      navigate("/login");
    } else {
      toast({
        title: t.signupError,
        description: t.signupErrorDesc,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="border-b-4 bg-muted backdrop-blur w-full">
        <QuizHeader />
      </div>
      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 text-foreground transition-all hover:scale-110 h-12 w-12 z-50"
      >
        <Home className="h-8 w-8" />
      </Button>
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">Registrieren</h2>
          
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage 
                src={profilePicture || defaultAvatar} 
                alt="Profilbild"
                className="object-cover"
              />
              <AvatarFallback className="bg-muted text-foreground text-2xl">
                {username ? username[0].toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.capture = "environment";
                  input.onchange = (e) => handleFileSelect(e as any);
                  input.click();
                }}
              >
                <Camera className="mr-2 h-4 w-4" />
                Aufnehmen
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => handleFileSelect(e as any);
                  input.click();
                }}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Auswählen
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">{t.username}</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-secondary text-secondary-foreground h-12 text-lg">
              {t.signup}
            </Button>
          </form>
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => navigate("/login")}
              className="text-primary"
            >
              {t.hasAccount}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
