'use client';

import { User } from '@/types/user';
import React, { useState, createContext, useEffect } from 'react';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  refreshTokens: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    tokens: null,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(false);

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          const user: User = {
            id: '1',
            name: 'João Silva',
            email: credentials.email,
            role: 'trader',
          };

          const tokens: AuthTokens = {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
          };

          setAuthState({
            user,
            tokens,
            isAuthenticated: true,
          });
          resolve();
        }, 1500);
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      tokens: null,
      isAuthenticated: false,
    });
  };

  const refreshTokens = async () => {
    if (!authState.tokens?.refreshToken) {
      logout();
      return;
    }

    try {
      // Simulate refresh API call
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          const newTokens: AuthTokens = {
            accessToken: 'new-mock-access-token',
            refreshToken: authState.tokens!.refreshToken,
            expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
          };

          setAuthState((prev) => ({
            ...prev,
            tokens: newTokens,
          }));
          resolve();
        }, 1000);
      });
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  // Auto-refresh tokens when they're about to expire
  useEffect(() => {
    if (authState.tokens && authState.isAuthenticated) {
      const timeUntilExpiry = authState.tokens.expiresAt - Date.now();
      const refreshTime = timeUntilExpiry - 2 * 60 * 1000; // Refresh 2 minutes before expiry

      if (refreshTime > 0) {
        const timeoutId = setTimeout(() => {
          refreshTokens();
        }, refreshTime);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [authState.tokens]);

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshTokens,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
