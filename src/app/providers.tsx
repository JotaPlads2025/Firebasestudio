'use client';

import { FirebaseClientProvider } from '@/firebase';
import AppShell from '@/components/AppShell';
import { ThemeProvider } from 'next-themes';
import React, { useState, useEffect } from 'react';

// This component ensures its children are only rendered on the client side.
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FirebaseClientProvider>
        <ClientOnly>
          <AppShell>{children}</AppShell>
        </ClientOnly>
      </FirebaseClientProvider>
    </ThemeProvider>
  );
}
