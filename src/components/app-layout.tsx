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
import { Bell, Search } from 'lucide-react';
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
import Image from 'next/image';

const PladsProLogo = () => (
  <div className="flex items-center gap-2">
    <Image
      src="https://i.imgur.com/6c2rrtU.png"
      alt="Plads Pro Logo"
      width={120}
      height={30}
      className="w-auto h-7"
    />
  </div>
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <SidebarProvider>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="group data-[state=expanded]:bg-sidebar-background"
      >
        <SidebarHeader>
          <PladsProLogo />
        </SidebarHeader>
        <SidebarContent className="p-2">
          <Nav />
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-12 w-full items-center justify-start gap-2 p-2 text-left text-sm"
              >
                <Avatar className="h-8 w-8">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="font-medium text-sidebar-foreground">Susana González</p>
                  <p className="text-xs text-muted-foreground">susana.gonzalez@example.com</p>
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
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
