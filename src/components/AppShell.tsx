
'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase/provider';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Nav from '@/components/nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Loader2, Settings, UserCircle, MessageSquare, BookOpenCheck, Building, LayoutDashboard, Search, Rocket, Users, Instagram } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from './ui/badge';


const PladsProLogo = () => {
  return (
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
};


export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);

  const pathname = usePathname();
  const isPublicPage = pathname === '/login' || pathname.startsWith('/search-classes/');

  React.useEffect(() => {
    if (isUserLoading || isPublicPage) {
      return; 
    }
    if (!user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router, isPublicPage]);
  
  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  const runCommand = React.useCallback((command: () => void) => {
    setIsCommandPaletteOpen(false);
    command();
  }, []);

  if (isPublicPage) {
    return <>{children}</>;
  }
  
  if (isUserLoading || !user) {
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
        <SidebarHeader className="flex items-center justify-between relative">
          <PladsProLogo />
          <SidebarTrigger className="hidden md:flex" />
        </SidebarHeader>
        <SidebarContent className="p-2">
          <Nav />
        </SidebarContent>
        <SidebarFooter className="mt-auto p-2 text-center space-y-1">
          <SidebarSeparator className="mb-2" />
          <div className="flex items-center justify-center gap-1 group-data-[collapsible=icon]:hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#" target="_blank">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-sidebar-foreground/60 hover:text-sidebar-foreground">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Instagram</TooltipContent>
            </Tooltip>
          </div>
          <Link
            href="#"
            className="group-data-[collapsible=icon]:hidden text-[10px] text-sidebar-foreground/50 hover:text-sidebar-foreground/70"
          >
            Términos y Condiciones
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-gradient-to-r from-brand-purple to-brand-green px-4 text-sidebar-foreground md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="relative flex-1">
             <Popover open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen}>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    className="w-full justify-start rounded-lg bg-background/10 pl-8 text-sidebar-foreground placeholder:text-sidebar-foreground/60 hover:bg-background/20 hover:text-sidebar-foreground md:w-[300px] lg:w-[420px]"
                    >
                    <span className="truncate">Escribe un comando o busca...</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[420px] p-0" align="start">
                    <Command>
                    <CommandInput placeholder="Escribe un comando..." />
                    <CommandList>
                        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                        <CommandGroup heading="Navegación">
                            <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/classes'))}>
                                <BookOpenCheck className="mr-2 h-4 w-4" />
                                <span>Mis Clases</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/students'))}>
                                <Users className="mr-2 h-4 w-4" />
                                <span>Estudiantes</span>
                            </CommandItem>
                             <CommandItem onSelect={() => runCommand(() => router.push('/classes/new'))}>
                                <BookOpenCheck className="mr-2 h-4 w-4" />
                                <span>Crear Clase</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/academy'))}>
                                <Building className="mr-2 h-4 w-4" />
                                <span>Mi Academia</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/communication'))}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span>Comunicación</span>
                            </CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/search-classes'))}>
                                <Search className="mr-2 h-4 w-4" />
                                <span>Buscar Clases</span>
                            </CommandItem>
                             <CommandItem onSelect={() => runCommand(() => router.push('/profile'))}>
                                <UserCircle className="mr-2 h-4 w-4" />
                                <span>Perfil</span>
                            </CommandItem>
                             <CommandItem onSelect={() => runCommand(() => router.push('/pro-plan'))}>
                                <Rocket className="mr-2 h-4 w-4" />
                                <span>Planes</span>
                            </CommandItem>
                             <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Configuraciones</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            {isUserLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
                      <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || 'Usuario'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email || 'No email'}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configuraciones</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
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
