import { IconPlus, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Helpers from "@/config/helpers"

interface ActionButton {
  label: string
  onClick: () => void
  icon?: Icon
  variant?: "default" | "secondary" | "ghost" | "link" | "outline" | "destructive"
  className?: string
  mobileHidden?: boolean
}

export function SiteHeader({ title = "Documents" }: { title?: string }) {
  const actionButtons: ActionButton[] = [
    {
      label: "Toast",
      onClick: () => { Helpers.showToast('Hello') },
      variant: "ghost",
      mobileHidden: true
    },
    {
      label: "New",
      onClick: () => { console.log("New item") },
      icon: IconPlus,
      variant: "outline"
    }
  ]
  
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          {actionButtons.map((button, index) => (
            <Button 
              key={index}
              variant={button.variant} 
              size="sm" 
              onClick={button.onClick}
              className={`${button.mobileHidden ? 'hidden sm:flex' : 'flex'} ${button.className || ''}`}
            >
              {button.icon && <button.icon className="mr-2 h-4 w-4" />}
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  )
}
