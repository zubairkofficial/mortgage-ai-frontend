import { AppSidebar } from "@/components/layout/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/layout/dashboard/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { brokerNavLinks } from "@/lib/navlinks"
import { Outlet, Navigate } from "react-router-dom"
import { useUser } from "@/stores/userStore"
import { UserRole } from "@/lib/users"

export default function BrokerLayout() {
    // Get user from global state
    const user = useUser(state => state.user)
    
    // Redirect if not authenticated or not a broker
    if (!user || user.role !== UserRole.BROKER) {
        return <Navigate to="/login" />
    }
    
    return (
        <SidebarProvider>
            <AppSidebar 
                variant="inset" 
                navLinks={brokerNavLinks} 
                userData={user} 
            />
            <SidebarInset>
                <DashboardHeader userType="broker" />
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
