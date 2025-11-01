
'use client';

import { FirebaseClientProvider } from '@/firebase';
import AppShell from '@/components/AppShell';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <AppShell>{children}</AppShell>
    </FirebaseClientProvider>
  );
}
