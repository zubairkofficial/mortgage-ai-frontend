import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "../theme/theme-provider"
import { IconSun, IconMoon, IconBuildingBank } from "@tabler/icons-react"
import Helpers from "@/config/helpers"

interface ActionButton {
  label: string | React.ReactNode
  onClick: () => void
  variant?: "default" | "secondary" | "ghost" | "link" | "outline" | "destructive"
  className?: string
  mobileHidden?: boolean
}

type UserTypeProps = "broker" | "account_executive" | "underwriting_manager" | "branch_manager" | "admin";

// Map user role to a display name
const getRoleDisplayName = (userType: UserTypeProps): string => {
  switch (userType) {
    case 'broker':
      return 'Broker Portal';
    case 'account_executive':
      return 'Account Executive Portal';
    case 'underwriting_manager':
      return 'Underwriting Manager Portal';
    case 'branch_manager':
      return 'Branch Manager Portal';
    case 'admin':
      return 'Admin Portal';
    default:
      return 'Dashboard';
  }
};

export function DashboardHeader({ 
  title, 
  userType = "admin" 
}: { 
  title?: string;
  userType?: UserTypeProps;
}) {
  const { theme, setTheme } = useTheme();

  // Use title if provided, otherwise use role-based title
  const headerTitle = title || getRoleDisplayName(userType);
  
  const actionButtons: ActionButton[] = [
    {
      label: "Toast",
      onClick: () => { Helpers.showToast('Hello','success') },
      variant: "ghost",
      mobileHidden: true
    },
    {
      label: theme === "dark" ? <IconSun /> : <IconMoon />,
      onClick: () => { setTheme(theme === "dark" ? "light" : "dark") },
      variant: "ghost",
      mobileHidden: true
    },
  ]
  
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 py-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2">
          <IconBuildingBank size={20} className="text-primary" />
          <h1 className="text-base font-medium">{headerTitle}</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {actionButtons.map((button, index) => (
            <Button 
              key={index}
              variant={button.variant} 
              size="sm" 
              onClick={button.onClick}
              className={`${button.mobileHidden ? 'hidden sm:flex' : 'flex'} ${button.className || ''}`}
            >
              {button.label}
            </Button>
          ))}
      
        </div>
      </div>
    </header>
  )
}
