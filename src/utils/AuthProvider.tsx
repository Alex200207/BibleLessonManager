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
  const [token, setToken] = useState<string>(sessionStorage.getItem('token') || '');
  const [role, setRole] = useState<string>(sessionStorage.getItem('role') || '');

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem('token') || '');
      setRole(sessionStorage.getItem('role') || '');
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

      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = (): void => {
    setToken('');
    setRole('');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  };

  const isAuthenticated = !!token;

  const authContextValue = useMemo(
    () => ({ isAuthenticated, role, login, logout, token }),
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
