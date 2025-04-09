'use client';

import { useEffect } from 'react';

export const AuthThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const savedTheme = document.documentElement.classList.contains('dark');

    document.documentElement.classList.add('dark');

    return () => {
      if (savedTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
  }, []);

  return <>{children}</>;
};
