import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest, registerRequest } from '../services/auth';
import api from '../services/api';

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      api.defaults.headers.Authorization = `Bearer ${t}`;
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const t = await loginRequest(email, password);
      setToken(t);
      localStorage.setItem('token', t);
      api.defaults.headers.Authorization = `Bearer ${t}`;
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const t = await registerRequest({ name, email, password });
      setToken(t);
      localStorage.setItem('token', t);
      api.defaults.headers.Authorization = `Bearer ${t}`;
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = null;
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);