import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate , NavLink } from "react-router-dom";
import { IconNode, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavMain({
  items = [],
}: {
  items?: {
    title: string
    url: string
    icon?: IconNode | React.ReactNode
  }[]
}) {
  const navigate = useNavigate();

  const renderIcon = (icon: any, active: boolean) => {
    // If it's already a React element, render it with a wrapper
    if (React.isValidElement(icon)) {
      return (
        <span className={cn(active ? "text-primary" : "")}>
          {icon}
        </span>
      );
    }

    // If it's a component class/function (Tabler icon)
    if (typeof icon === 'function') {
      // Create a new element with the icon component
      return React.createElement(icon, {
        className: cn("h-4 w-4", active ? "text-primary" : "")
      });
    }

    // Return null for any other case
    return null;
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Messenger"
              onClick={() => navigate("/chat")}
              className="bg-primary justify-center flex text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <Mail />
              <span>Messenger</span>
            </SidebarMenuButton>

          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items && items.length > 0 && items.map((item) => {
            return (
              <SidebarMenuItem key={item.title} onClick={() => navigate(item.url)}>
                <NavLink
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 peer/menu-button w-full px-2 py-2 rounded-md transition-colors duration-200",
                    isActive ? "bg-primary/10 text-primary font-semibold" : "hover:bg-sidebar-accent text-foreground"
                  )
                }
                
              >
                {item.icon && renderIcon(item.icon, false)}
                <span>{item.title}</span>
              </NavLink>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
