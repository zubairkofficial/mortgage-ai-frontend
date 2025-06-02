import { Role } from "./types";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import {
  Search,
  Info,
} from "lucide-react";

interface ChatHeaderProps {
  role: Role;
}

export function ChatHeader({ role }: ChatHeaderProps) {
  return (
    <div className="py-3 px-6 border-b border-border flex items-center justify-between bg-background">
      <div className="flex items-center">
        <UserAvatar user={role} />
        <div className="ml-3">
          <h4 className="font-medium text-foreground">{role.name}</h4>
          <p className="text-xs text-muted-foreground">{role.status}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Info className="h-4 w-4" />
        </Button>
  
      </div>
    </div>
  );
}
