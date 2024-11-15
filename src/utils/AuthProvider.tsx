// src/context/AuthContext.tsx
import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from 'react';
import { API_URL } from '../constant';

type LoginResponse = {
  token: string;
  role: string;
};

type LoginData = {
  email: string;
  password: string;
};

interface AuthContextType {
  userRole: string; // Add this line
  isAuthenticated: boolean;
  role: string;
  login: (data: LoginData) => Promise<LoginResponse>;
  logout: () => void;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [role, setRole] = useState<string>(localStorage.getItem('role') || '');

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token') || '');
      setRole(localStorage.getItem('role') || '');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async ({ email, password }: LoginData): Promise<LoginResponse> => {
    try {
      console.log('Datos de inicio de sesión:', { email, password });
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setToken(data.token);
      setRole(data.role);

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = (): void => {
    setToken('');
    setRole('');

    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const isAuthenticated = !!token;

  const authContextValue = useMemo(
    () => ({ isAuthenticated, role, login, logout, token, userRole: role }),
    [isAuthenticated, role, token]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
