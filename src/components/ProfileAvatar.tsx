import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileAvatarProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ProfileAvatar = ({ className = "", size = "md" }: ProfileAvatarProps) => {
  const { currentUser, updateProfilePicture } = useAuth();
  const [open, setOpen] = useState(false);

  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfilePicture(base64String);
        setOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    updateProfilePicture("");
    setOpen(false);
  };

  if (!currentUser) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={`${sizeClasses[size]} ${className}`}>
          <Avatar className="h-full w-full cursor-pointer border-2 border-primary transition-all hover:border-primary/70">
            {currentUser.profilePicture ? (
              <AvatarImage 
                src={currentUser.profilePicture} 
                alt="Profilbild"
                className="object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {currentUser.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-muted border-2 border-border shadow-lg rounded-xl">
        <div className="flex flex-col gap-2">
          {currentUser.profilePicture && (
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/20 transition-all rounded-lg font-semibold"
              onClick={handleDeletePhoto}
            >
              <X className="mr-2 h-5 w-5" />
              Foto löschen
            </Button>
          )}
          <Button
            className="w-full justify-start bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all rounded-lg font-semibold"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.capture = "environment";
              input.onchange = (e) => handleFileSelect(e as any);
              input.click();
            }}
          >
            <Camera className="mr-2 h-5 w-5" />
            Foto aufnehmen
          </Button>
          <Button
            className="w-full justify-start bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all rounded-lg font-semibold"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => handleFileSelect(e as any);
              input.click();
            }}
          >
            <ImageIcon className="mr-2 h-5 w-5" />
            Foto auswählen
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-card-foreground hover:bg-background hover:text-foreground transition-all rounded-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            Abbrechen
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileAvatar;
