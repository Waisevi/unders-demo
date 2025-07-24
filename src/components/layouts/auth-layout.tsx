import Route from '@/const/route';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from '../contexts/session-context';

type Props = {
  children: React.ReactNode;
};

/**
 * Redirecting a user depending on the availability of an access token
 */
export const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!isAuthenticated && router.pathname !== Route.LOGIN) {
      router.replace(Route.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (!mounted) return null;

  return <>{children}</>;
};
