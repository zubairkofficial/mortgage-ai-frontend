import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { UserRole } from "@/lib/users";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles: UserRole[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state if auth is still initializing
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    let redirectPath = "/";
    
    switch (user.role) {
      case UserRole.BROKER:
        redirectPath = "/broker";
        break;
      case UserRole.ACCOUNT_EXECUTIVE:
        redirectPath = "/account-executive";
        break;
      case UserRole.UNDERWRITING_MANAGER:
        redirectPath = "/underwriting-manager";
        break;
      case UserRole.BRANCH_MANAGER:
        redirectPath = "/branch-manager";
        break;
      case UserRole.BORROWER:
        redirectPath = "/borrower";
        break;
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  // Render children if user is authenticated and has the required role
  return <>{children}</>;
};

export default ProtectedRoute; 