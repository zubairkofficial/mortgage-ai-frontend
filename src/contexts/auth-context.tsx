import React, { createContext, useContext, useState, useEffect } from 'react';
import { dummyUsers } from '@/lib/users';
import { toast } from 'sonner';
import { useUser, User } from '@/stores/userStore';

// Auth context interface
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, clearUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user on mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = dummyUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      // Omit password from stored user
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    }

    toast.error('Invalid email or password');
    return false;
  };

  // Logout function
  const logout = () => {
    toast.success('You have been logged out successfully');
    clearUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 