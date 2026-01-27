'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireUserType?: 'worker' | 'agency' | 'admin';
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requireUserType,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      // Not authenticated - redirect to login
      if (!user) {
        router.push(redirectTo);
        return;
      }

      // Authenticated but wrong user type - redirect to appropriate dashboard
      if (requireUserType && userProfile?.userType !== requireUserType) {
        if (userProfile?.userType === 'worker') {
          router.push('/dashboard');
        } else if (userProfile?.userType === 'agency') {
          router.push('/agency');
        } else {
          router.push('/');
        }
      }
    }
  }, [user, userProfile, loading, requireUserType, redirectTo, router]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  // Wrong user type
  if (requireUserType && userProfile?.userType !== requireUserType) {
    return null;
  }

  // All checks passed - render children
  return <>{children}</>;
}
