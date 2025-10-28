
'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Nav from '@/components/nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Instagram, Search, LogOut, Loader2, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { TikTokIcon } from '@/components/ui/icons';
import Link from 'next/link';

const PladsProLogo = () => (
  <div className="flex items-center gap-2">
    <div className="p-0">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="6" fill="hsl(var(--brand-purple))" />
        <path
          d="M12.5 5C13.3284 5 14 5.67157 14 6.5C14 7.32843 13.3284 8 12.5 8C11.6716 8 11 7.32843 11 6.5C11 5.67157 11.6716 5 12.5 5ZM9.3 19L11 15.65L14 9H9V11H12.5L10.3 15.65L11.5 18L15 11H17L11.5 22L9.3 19Z"
          fill="hsl(var(--brand-green))"
        />
      </svg>
    </div>
    <span className="font-headline text-xl font-bold text-sidebar-foreground">
      Plads Pro
    </span>
  </div>
);

const UserMenu = () => {
    const { user } = useUser();
    const auth = useAuth();

    const handleLogout = () => {
        auth?.signOut();
    }

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-12 w-full items-center justify-start gap-2 p-2 text-left text-sm"
              >
                <Avatar className="h-8 w-8">
                  {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
                  <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="font-medium text-sidebar-foreground">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile"><DropdownMenuItem>Perfil</DropdownMenuItem></Link>
              <Link href="/settings"><DropdownMenuItem>Configuraciones</DropdownMenuItem></Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    )
}

const HeaderUser = () => {
    const { user } = useUser();

    if (!user) return null;

    return (
        <div className="hidden items-center gap-2 md:flex">
              <Avatar className="h-8 w-8">
                {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
                <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">{user.displayName}</span>
        </div>
    )
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';
    if (!USE_FIREBASE) return;
    
    if (isUserLoading) {
      return; 
    }
    if (!user && pathname !== '/login') {
      router.replace('/login');
    }
     if (user && pathname === '/login') {
      router.replace('/');
    }
  }, [user, isUserLoading, router, pathname]);

  const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

  if (pathname === '/login') {
    return <>{children}</>;
  }
  
  if (USE_FIREBASE && (isUserLoading || (!isUserLoading && !user))) {
      return (
          <div className="flex h-screen w-screen items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      );
  }

  return (
    <SidebarProvider>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="group data-[state=expanded]:bg-gradient-to-b from-brand-purple to-brand-green"
      >
        <SidebarHeader className="flex items-center justify-between">
          <PladsProLogo />
          <SidebarTrigger className="hidden md:flex" />
        </SidebarHeader>
        <SidebarContent className="p-2">
          <Nav />
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2">
          <SidebarSeparator className="md:group-data-[collapsible=icon]:hidden" />
          <div className="flex flex-col gap-4 p-2 text-center text-xs text-sidebar-foreground/70 md:group-data-[collapsible=icon]:hidden">
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/pladsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sidebar-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/pladsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sidebar-foreground"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-1">
              <p>
                <Link href="#" className="text-xs hover:underline">
                  Terminos y condiciones
                </Link>
              </p>
              <p>hola@plads.cl</p>
            </div>
          </div>
          <SidebarSeparator />
          <UserMenu />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-gradient-to-r from-brand-purple to-brand-green px-4 text-sidebar-foreground md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 " />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background/10 pl-8 text-sidebar-foreground placeholder:text-sidebar-foreground/60 focus:bg-background/20 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <HeaderUser />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                <Button
                className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
                size="icon"
                >
                <MessageSquare className="h-7 w-7" />
                <span className="sr-only">Soporte</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
                <p>Soporte</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
