'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthData = {
  member_id: number;
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
  getAuthHeader: () => Record<string, string>;
};

const emptyAuth: AuthData = {
  member_id: 0,
  account: '',
  nickname: '',
  avatar_url: '',
  token: '',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const storageKey = 'my_blog_auth';

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<AuthData>(emptyAuth);

  // `http://localhost:3001/login/api` 會員登入 api
  const login = async (
    account: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('http://localhost:3001/login/api', {
        method: 'POST',
        body: JSON.stringify({ account, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
      if (result.success) {
        localStorage.setItem(storageKey, JSON.stringify(result.data));
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

  // 登出
  const logout = () => {
    localStorage.removeItem(storageKey);
    setAuth({ ...emptyAuth });
  };

  // 取得已登入的 token
  const getAuthHeader = (): Record<string, string> => {
    if (!auth.member_id || !auth.token) return {};
    return {
      Authorization: `Bearer ${auth.token}`,
    };
  };

  useEffect(() => {
    const str = localStorage.getItem(storageKey);
    if (!str) {
      setAuth({ ...emptyAuth });
      return;
    }
    try {
      const data = JSON.parse(str);
      if (data && typeof data === 'object' && data.token) setAuth(data);
    } catch (err) {
      console.error('Failed to parse auth data:', err);
      localStorage.removeItem(storageKey);
      setAuth({ ...emptyAuth });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, getAuthHeader }}>
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
