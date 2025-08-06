'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/shared/context/auth';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <div>{children}</div>
    </AuthProvider>
  );
};
