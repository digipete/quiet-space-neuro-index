import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '@/lib/analytics';

export const PageViewTracker = () => {
  const { pathname } = useLocation();
  useEffect(() => { track('page_view', pathname); }, [pathname]);
  return null;
};