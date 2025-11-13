import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';
import { poppins, ptSans } from './fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Plads Pro',
  description: 'Instructor dashboard for Plads',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          'font-body bg-background text-foreground antialiased',
          poppins.variable,
          ptSans.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
