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
      <div className="rounded-lg bg-primary p-1.5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="hsl(var(--primary))" />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="hsl(var(--accent))"
            fontSize="16"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            P
          </text>
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
        className="group data-[state=expanded]:bg-sidebar"
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
                <Link href="#" className="text-xs hover:underline">
                  Terminos y condiciones
                </Link>
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
              <DropdownMenuItem>Perfíl</DropdownMenuItem>
              <DropdownMenuItem>Configuraciones</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-sidebar px-4 text-sidebar-foreground md:px-6">
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
            <div className="flex items-center gap-2">
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
