import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types/user';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  getAccessToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo, always authenticated
  const [user] = useState<User>({
    id: '1',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    role: 'risk_manager',
    permissions: ['create_icaap', 'edit_icaap', 'review_icaap'],
    companyId: '1',
    company: {
      name: 'Demo Bank',
      type: 'bank'
    },
    position: 'Risk Manager',
    createdAt: new Date().toISOString()
  });

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const getAccessToken = async () => {
    return 'demo-token';
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading: false,
      user,
      login,
      logout,
      getAccessToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}