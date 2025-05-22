import { Info, MoreVertical, Phone, Video } from 'lucide-react';
import { User } from './types';
import { UserAvatar } from './user-avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface ChatHeaderProps {
  user: User;
}

export function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <div className="py-3 px-6 border-b border-border bg-background flex items-center justify-between">
      <div className="flex items-center">
        <UserAvatar user={user} />
        <div className="ml-3">
          <h4 className="font-medium text-foreground">{user.name}</h4>
          <p className="text-xs text-brand-teal">{user.isOnline ? 'Online' : 'Offline'}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Phone call">
          <Phone className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Video call">  
          <Video className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Info">
          <Info className="h-4 w-4 text-muted-foreground" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="More options">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Mute notifications</DropdownMenuItem>
            <DropdownMenuItem>Search</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Block contact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 