import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { DashboardHeader } from "@/components/layout/dashboard/dashboard-header";
import { AppSidebar } from "@/components/layout/dashboard/app-sidebar";
import { accountExecutiveNavLinks } from "@/lib/navlinks";
import { UserRole } from "@/lib/users";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/stores/userStore";



const AccountExecutiveLayout: FC = () => {
  // Get user from global state
  const user = useUser(state => state.user);
  
  // Redirect if not authenticated or not an account executive
  if (!user || user.role !== UserRole.ACCOUNT_EXECUTIVE) {
    return <Navigate to="/login" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar 
        variant="inset"
        navLinks={accountExecutiveNavLinks} 
        userData={user} 
      />
      <SidebarInset>
        <DashboardHeader userType="account_executive" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>  
  );
};

export default AccountExecutiveLayout; 