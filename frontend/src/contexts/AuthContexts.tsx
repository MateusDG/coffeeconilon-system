import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest } from '../services/auth';
import api from '../services/api';

interface AuthContextProps {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  ready: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [ready, setReady] = useState(false);

  // Validate token on load
  useEffect(() => {
    const validate = async () => {
      if (!token) return;
      try {
        await api.get('/auth/me');
      } catch {
        setToken(null);
        localStorage.removeItem('token');
      }
    };
    validate().finally(() => setReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const t = await loginRequest(email, password);
    setToken(t);
    localStorage.setItem('token', t);
  };

  const register = async (name: string, email: string, password: string) => {
    const t = await registerRequest({ name, email, password });
    setToken(t);
    localStorage.setItem('token', t);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
