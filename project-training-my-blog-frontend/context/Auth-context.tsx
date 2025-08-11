'use client';
import React, { createContext, useContext, useState } from 'react';

type AuthData = {
  id: number;
  account: string;
  nickname: string;
  avatar_url: string;
  token: string;
};

type AuthContextType = {
  auth: AuthData;
  login: (
    account: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const emptyAuth: AuthData = {
  id: 0,
  account: '',
  nickname: '',
  avatar_url: '',
  token: ''
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
                                      children
                                    }: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<AuthData>(emptyAuth);

  // 登入 `http://localhost:3001/api/login`
  const login = async (
    account: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('http://localhost:3001//api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ account, password })
      });
      const result = await res.json();
      if (result.success) {
        setAuth(result.data);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Login failed:', err);
      return { success: false, error: '系統錯誤，請稍後再試' };
    }
  };

  // 登出 `http://localhost:3001/api/logout`
  const logout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        setAuth(() => emptyAuth);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Logout failed:', err);
      return { success: false, error: '系統錯誤，請稍後再試' };
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
