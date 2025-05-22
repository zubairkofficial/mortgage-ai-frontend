import { User } from './types';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ user, size = 'md' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <div className="relative">
      <Avatar className={cn(sizeClasses[size])}>
        {user.avatar ? (
          <AvatarImage src={user.avatar} alt={user.name} />
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user.initials}
          </AvatarFallback>
        )}
      </Avatar>
      {user.isOnline && (
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-brand-teal border-2 border-background"></div>
      )}
    </div>
  );
} 