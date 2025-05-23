import * as React from "react"
import { NavMain } from "@/components/layout/dashboard/nav-main"
import { UserMenu } from "@/components/layout/dashboard/user-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { type NavItem } from "@/lib/navlinks"
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/lib/users";
import { useUser } from "@/stores/userStore"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navLinks: NavItem[]
  userData: {
    name: string
    email: string
    avatar: string
    id: string
    role: UserRole
  }
}

export function AppSidebar({ navLinks, userData, ...props }: AppSidebarProps) {
  const navigate = useNavigate();
  const clearUser = useUser(state => state.clearUser);
  
  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };
  
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src="/fav.svg" alt="Mortgage AI" width={20}  />
                <span className="text-base font-semibold">Mortgage AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navLinks.map((link) => ({
          title: link.title,
          url: link.url,
          icon: link.icon
        }))} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={userData} onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  )
}
