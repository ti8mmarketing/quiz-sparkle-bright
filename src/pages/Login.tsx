import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import QuizHeader from "@/components/QuizHeader";
import { useToast } from "@/hooks/use-toast";
import { Home } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      toast({
        title: t.loginSuccess,
        description: t.loginSuccessDesc,
      });
      navigate("/");
    } else {
      toast({
        title: t.loginError,
        description: t.loginErrorDesc,
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
          <h2 className="text-3xl font-bold text-center text-primary">{t.login}</h2>
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
              {t.login}
            </Button>
          </form>
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => navigate("/signup")}
              className="text-primary"
            >
              {t.noAccount}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
