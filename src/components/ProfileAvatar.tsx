import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import defaultAvatar from "@/assets/default-avatar.jpg";

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
            <AvatarImage 
              src={currentUser.profilePicture || defaultAvatar} 
              alt="Profilbild"
              className="object-cover"
            />
            <AvatarFallback className="bg-muted text-foreground">
              {currentUser.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="flex flex-col gap-1">
          {currentUser.profilePicture && (
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleDeletePhoto}
            >
              <X className="mr-2 h-4 w-4" />
              Foto löschen
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start"
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
            Foto aufnehmen
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => handleFileSelect(e as any);
              input.click();
            }}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Foto auswählen
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
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
