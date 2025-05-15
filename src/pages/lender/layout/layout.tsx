import { AppSidebar } from "@/components/layout/app-sidebar"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { lenderNavLinks, mockUserData } from "@/lib/navlinks"
import { Outlet } from "react-router-dom"

export default function LenderLayout() {
    return (
        <SidebarProvider>
            <AppSidebar 
                variant="inset" 
                navLinks={lenderNavLinks} 
                userData={mockUserData} 
            />
            <SidebarInset>
                <DashboardHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
