import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { branchManagerNavLinks } from "@/lib/navlinks";
import { UserRole } from "@/lib/users";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUserStore } from "@/stores/userStore";


const BranchManagerLayout: FC = () => {
  // Get user from global state
  const user = useUserStore(state => state.user);
  
  // Redirect if not authenticated or not a branch manager
  if (!user || user.role !== UserRole.BRANCH_MANAGER) {
    return <Navigate to="/login" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar
        variant="inset"
        navLinks={branchManagerNavLinks}
        userData={user}
      />
      <SidebarInset>
        <DashboardHeader userType="branch_manager" />
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

export default BranchManagerLayout; 