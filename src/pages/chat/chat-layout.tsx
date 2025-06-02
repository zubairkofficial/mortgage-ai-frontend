import { useState } from "react";
import { Role, Message } from "@/components/layout/chat/types";
import { ChatHeader } from "@/components/layout/chat/chat-header";
import { MessageList } from "@/components/layout/chat/message-list";
import { MessageInput } from "@/components/layout/chat/message-input";
import { Input } from "@/components/ui/input";
import {
  Search,
  PlusCircle,
  User as UserIcon,
  Moon,
  Sun,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/userStore";
import { UserRole } from "@/lib/users";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for roles
const mockRoles: Role[] = [
  {
    id: 1,
    name: "Underwriting Manager",
    avatar: null,
    initials: "UM",
    status: "online",
    unreadCount: 2,
    lastMessage: "Can you review the latest loan application?",
    isOnline: true,
    messages: [
      {
        id: 1,
        type: "text",
        content: {
          text: "Hi Loan Officer, I have a new loan application that needs your review.",
        },
        timestamp: "10:00 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 2,
        type: "text",
        content: {
          text: "Sure, I'll take a look at it. Can you share the details?",
        },
        timestamp: "10:05 am",
        isRead: true,
        isSender: false,
      },
      {
        id: 3,
        type: "text",
        content: {
          text: "I've attached the application file. Please review the income verification documents.",
        },
        timestamp: "10:10 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 4,
        type: "file",
        content: {
          fileName: "loan_application.pdf",
          fileSize: "2.4 MB",
          fileType: "application/pdf",
        },
        timestamp: "10:11 am",
        isRead: true,
        isSender: true,
      },
      {
        id: 5,
        type: "text",
        content: {
          text: "I'll review it and get back to you by end of day.",
        },
        timestamp: "10:15 am",
        isRead: true,
        isSender: false,
      },
    ],
  },
  {
    id: 2,
    name: "Loan Officer",
    avatar: null,
    initials: "LO",
    status: "online",
    lastMessage: "I'll review it and get back to you by end of day.",
    isOnline: true,
    messages: [
      {
        id: 1,
        type: "text",
        content: {
          text: "Hi Underwriting Manager, I've reviewed the loan application.",
        },
        timestamp: "2:00 pm",
        isRead: true,
        isSender: true,
      },
      {
        id: 2,
        type: "text",
        content: {
          text: "Great, what are your findings?",
        },
        timestamp: "2:05 pm",
        isRead: true,
        isSender: false,
      },
      {
        id: 3,
        type: "text",
        content: {
          text: "The income verification looks good, but we need additional documentation for the property appraisal.",
        },
        timestamp: "2:10 pm",
        isRead: true,
        isSender: true,
      },
      {
        id: 4,
        type: "text",
        content: {
          text: "I'll request that from the client right away.",
        },
        timestamp: "2:15 pm",
        isRead: true,
        isSender: false,
      },
    ],
  },
];

export default function ChatLayout() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(mockRoles[0]);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const user = useUser((state) => state.user);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        type: "text",
        content: {
          text: message,
        },
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isRead: true,
        isSender: true,
      };

      const updatedRoles = roles.map((role) => {
        if (role.id === selectedRole.id) {
          return {
            ...role,
            messages: [...role.messages, newMessage],
            lastMessage: message,
          };
        }
        return role;
      });

      setRoles(updatedRoles);
      setSelectedRole({
        ...selectedRole,
        messages: [...selectedRole.messages, newMessage],
      });

      setMessage("");
    }
  };

  const navigateToDashboard = () => {
    if (!user) return;

    switch (user.role) {
      case UserRole.BROKER:
        navigate("/broker/dashboard");
        break;
      case UserRole.ACCOUNT_EXECUTIVE:
        navigate("/account-executive/dashboard");
        break;
      case UserRole.UNDERWRITING_MANAGER:
        navigate("/underwriting-manager/dashboard");
        break;
      case UserRole.BRANCH_MANAGER:
        navigate("/branch-manager/dashboard");
        break;
      case UserRole.LENDER:
        navigate("/lender/dashboard");
        break;
      case UserRole.ADMIN:
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="flex flex-1 overflow-hidden">
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
            // onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
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
                <h2 className="text-xl font-semibold">
                  Messages{" "}
                  <span className="text-sm text-muted-foreground">
                    ({roles.length})
                  </span>
                </h2>
              </div>

              {/* Search Bar */}
              <div className="px-4 pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search here..."
                    className="min-w-full pl-10 pr-4 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Favorites Section */}
              <div className="px-4 pb-2">
                <h3 className="text-xs font-medium text-muted-foreground mb-2">
                  FAVOURITES
                </h3>
              </div>

              {/* Contact List */}
              <div className="flex-1 overflow-y-auto">
                {filteredRoles.map((role) => (
                  <div
                    key={role.id}
                    className={cn(
                      "px-4 py-3 flex items-center hover:bg-accent cursor-pointer",
                      selectedRole.id === role.id && "border-l-4 border-primary"
                    )}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {role.initials}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-foreground">
                          {role.name}
                        </h4>
                        {role.unreadCount && (
                          <span className="text-xs font-medium bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                            {role.unreadCount}
                          </span>
                        )}
                      </div>
                      {role.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {role.lastMessage.slice(0, 30) + "..."}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Direct Messages Section */}
                <div className="px-4 py-3 flex justify-between items-center">
                  <h3 className="text-xs font-medium text-muted-foreground">
                    DIRECT MESSAGES
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-md"
                    aria-label="Add new message"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Sidebar Footer */}
              <div className="p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 px-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">My Profile</span>
                        <span className="text-xs text-muted-foreground">
                          View profile settings
                        </span>
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
                    <DropdownMenuItem
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      {theme === "dark" ? (
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
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatHeader role={selectedRole} />
          <div className="@container/main relative flex flex-1 flex-col">
            <MessageList
              messages={selectedRole.messages}
              isTyping={isTyping}
              typingRole={selectedRole}
            />
            <MessageInput
              message={message}
              onMessageChange={setMessage}
              onSend={handleSendMessage}
              file={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
