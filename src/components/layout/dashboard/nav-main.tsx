import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  // Check if current path matches the item url
  const isActive = (url: string) => {
    // Handle role-specific dashboard URLs
    if (url === location.pathname) {
      return true;
    }

    // For nested routes, check if the current path starts with the url
    // but exclude exact matches for parent routes
    return url == '/' &&
   
      location.pathname.startsWith(url) &&
      location.pathname !== url;
  };

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
            const active = isActive(item.url);
            return (
              <SidebarMenuItem key={item.title} onClick={() => navigate(item.url)}>
                <SidebarMenuButton tooltip={item.title} isActive={active}>
                  {item.icon && renderIcon(item.icon, active)}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
