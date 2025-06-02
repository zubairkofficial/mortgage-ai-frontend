import { Role } from "./types";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/stores/userStore";
import { UserRole } from "@/lib/users";

interface ChatSidebarProps {
  roles: Role[];
  selectedRole: Role;
  onRoleSelect: (role: Role) => void;
}

export function ChatSidebar({
  roles,
  selectedRole,
  onRoleSelect,
}: ChatSidebarProps) {

  const navigate = useNavigate();
  const user = useUser((state) => state.user);

  // Function to navigate to the appropriate dashboard based on user role
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

  return (
    <div className="w-72 border-r border-border flex flex-col bg-background">
      <div className="p-4 flex justify-between items-center">
        {/* Sidebar Header */}
        <h2 className="text-xl font-semibold">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={navigateToDashboard}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          Roles{" "}
          <span className="text-sm text-muted-foreground">
            ({roles.length})
          </span>
        </h2>
      </div>

      <Separator />

      {/* Roles List */}
      <div className="flex-1 overflow-y-auto">
        {roles.map((role) => (
          <div
            key={role.id}
            className={cn(
              "px-4 py-3 flex items-center hover:bg-accent cursor-pointer",
              selectedRole.id === role.id && "border-l-4 border-primary"
            )}
            onClick={() => onRoleSelect(role)}
          >
            <UserAvatar user={role} />
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-foreground">{role.name}</h4>
                {role.unreadCount && (
                  <span className="text-xs font-medium bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                    {role.unreadCount}
                  </span>
                )}
              </div>
              {role.lastMessage && (
                <p className="text-sm text-muted-foreground truncate">
                  {role.lastMessage}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Direct Messages Section */}
        <div className="px-4 py-3 flex justify-between items-center">
          <h3 className="text-xs font-medium text-muted-foreground">ROLES</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-md"
            aria-label="Add new role"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />
    </div>
  );
}
