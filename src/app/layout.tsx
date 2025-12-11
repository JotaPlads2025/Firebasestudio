
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';
import { poppins, ptSans } from './fonts';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

// export const metadata: Metadata = {
//   title: 'Plads Pro',
//   description: 'Instructor dashboard for Plads',
// };
// Metadata is now handled client-side or in specific page layouts if needed,
// as the main layout is now a client component.

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
          <title>Plads Pro</title>
          <meta name="description" content="Instructor dashboard for Plads" />
      </head>
      <body
        className={cn(
          'font-body bg-background text-foreground antialiased',
          poppins.variable,
          ptSans.variable
        )}
      >
        <ClientOnly>
          <Providers>{children}</Providers>
        </ClientOnly>
        <Toaster />
      </body>
    </html>
  );
}
