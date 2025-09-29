import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Nav from '@/components/nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Instagram, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SidebarTrigger } from './ui/sidebar';
import { TikTokIcon } from './ui/icons';
import Link from 'next/link';

const PladsProLogo = () => (
  <div className="flex items-center gap-2">
    <div className="rounded-lg p-1.5">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="6" fill="hsl(var(--sidebar-primary))" />
        <path
          d="M17.201 6.79903C15.9358 5.53381 14.288 4.81159 12.5594 4.81159C10.8308 4.81159 9.18298 5.53381 7.91776 6.79903C7.32043 7.39636 6.85362 8.11059 6.55447 8.89539C6.25531 9.68019 6.13111 10.5147 6.19034 11.3413C6.65715 11.2393 7.12319 11.2393 7.58923 11.3413C7.94091 11.4153 8.27771 11.5513 8.58309 11.7413C8.88847 11.9313 9.15585 12.1693 9.37089 12.4433C9.58593 12.7173 9.74441 13.0223 9.83848 13.3453C9.93255 13.6683 9.96068 14.0043 9.92066 14.3383C9.81866 14.8051 9.81866 15.2711 9.92066 15.7372C10.0039 16.5714 10.2526 17.3622 10.6593 18.068C11.4939 19.5169 12.9806 20.4545 14.6186 20.4545C16.2566 20.4545 17.7434 19.5169 18.5779 18.068C18.9846 17.3622 19.2333 16.5714 19.3166 15.7372C19.4186 15.2711 19.4186 14.8051 19.3166 14.3383C19.2766 14.0043 19.2485 13.6683 19.1544 13.3453C19.0603 13.0223 18.9019 12.7173 18.6868 12.4433C18.4718 12.1693 18.2044 11.9313 17.899 11.7413C17.5936 11.5513 17.2568 11.4153 16.9052 11.3413C17.3712 11.2393 17.8372 11.2393 18.3033 11.3413C18.4353 10.5312 18.3142 9.70425 17.9542 8.96903C17.5942 8.23381 17.0151 7.62539 16.2913 7.2217C15.5676 6.81802 14.7317 6.64381 13.8967 6.7211C13.0617 6.79839 12.2882 7.12351 11.6593 7.65345"
          stroke="hsl(var(--sidebar-primary-foreground))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <span className="font-headline text-xl font-bold text-sidebar-foreground">
      Plads Pro
    </span>
  </div>
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

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
        <SidebarFooter>
           <div className="flex flex-col gap-4 p-2 group-data-[collapsible=icon]:items-center">
             <div className="flex items-center gap-4 justify-center text-sidebar-foreground/80 group-data-[collapsible=icon]:flex-col">
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
             <div className="group-data-[collapsible=icon]:hidden text-center text-xs text-sidebar-foreground/60 space-y-1">
                <p>
                  <Link href="#" className="text-xs hover:underline">
                    Terminos y condiciones
                  </Link>
                </p>
                <p>hola@plads.cl</p>
             </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-12 w-full items-center justify-start gap-2 p-2 text-left text-sm"
              >
                <Avatar className="h-8 w-8">
                  {userAvatar && (
                    <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />
                  )}
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="font-medium text-sidebar-foreground">
                    Susana González
                  </p>
                  <p className="text-xs text-muted-foreground">
                    susana.gonzalez@example.com
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuraciones</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <div className="hidden items-center gap-2 md:flex">
              <Avatar className="h-8 w-8">
                {userAvatar && (
                  <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />
                )}
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Susana González</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
