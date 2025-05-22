import { Search, PlusCircle, User as UserIcon, Moon, Sun, Settings, LogOut, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { User as UserType } from './types';
import { UserAvatar } from './user-avatar';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/userStore";
import { UserRole } from "@/lib/users";

interface ChatSidebarProps {
  users: UserType[];
  selectedUser: UserType;
  onUserSelect: (user: UserType) => void;
}

export function ChatSidebar({ users, selectedUser, onUserSelect }: ChatSidebarProps) {
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = useUser((state) => state.user);

  // Function to navigate to the appropriate dashboard based on user role
  const navigateToDashboard = () => {
    if (!user) return;
    
    switch (user.role) {
      case UserRole.BROKER:
        navigate("/broker");
        break;
      case UserRole.ACCOUNT_EXECUTIVE:
        navigate("/account-executive");
        break;
      case UserRole.UNDERWRITING_MANAGER:
        navigate("/underwriting-manager");
        break;
      case UserRole.BRANCH_MANAGER:
        navigate("/branch-manager");
        break;
      case UserRole.LENDER:
        navigate("/lender");
        break;
      case UserRole.ADMIN:
        navigate("/admin");
        break;
      default:
        navigate("/");
        break;
    }
  };

  return (
    <div 
      className={cn(
        "border-r border-border flex flex-col bg-background transition-all duration-300 ease-in-out relative",
        collapsed ? "w-12" : "w-80"
      )}
    >
      {/* Toggle Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-0 top-4 translate-x-1/2 z-10 h-8 w-8 rounded-full border bg-background"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

    

      {!collapsed && (
        <>
        <div>
          {/* Back to Dashboard Button */}
          <Button 
            variant="ghost" 
            className="flex items-center w-full justify-start px-4 pt-8 pb-8 hover:bg-none"
            onClick={navigateToDashboard}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Dashboard</span>
          </Button>
          <Separator className="mb-2" />
          </div>
          {/* Sidebar Header */}
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Messages <span className="text-sm text-muted-foreground">({users.length})</span></h2>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Search here..." 
                className="w-full pl-10 pr-4 h-10"
              />
            </div>
          </div>

          {/* Favorites Section */}
          <div className="px-4 pb-2">
            <h3 className="text-xs font-medium text-muted-foreground mb-2">FAVOURITES</h3>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto">
            {users.map((user) => (
              <div 
                key={user.id}
                className={cn(
                  "px-4 py-3 flex items-center hover:bg-accent cursor-pointer",
                  selectedUser.id === user.id && "border-l-4 border-primary"
                )}
                onClick={() => onUserSelect(user)}
              >
                <UserAvatar user={user} />
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-foreground">{user.name}</h4>
                    {user.unreadCount && (
                      <span className="text-xs font-medium bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                        {user.unreadCount}
                      </span>
                    )}
                  </div>
                  {user.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Direct Messages Section */}
            <div className="px-4 py-3 flex justify-between items-center">
              <h3 className="text-xs font-medium text-muted-foreground">DIRECT MESSAGES</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md" aria-label="Add new message">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />
          
          {/* Sidebar Footer */}
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">My Profile</span>
                    <span className="text-xs text-muted-foreground">View profile settings</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
} 