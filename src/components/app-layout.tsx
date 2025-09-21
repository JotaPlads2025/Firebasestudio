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
        <rect width="24" height="24" rx="6" fill="#4A3186" />
        <path
          d="M16.1263 7.8737C15.0355 6.78284 13.5977 6.18841 12.094 6.18841C10.5902 6.18841 9.15243 6.78284 8.06157 7.8737C7.54593 8.38933 7.15112 9.01182 6.90382 9.6993C6.65651 10.3868 6.56277 11.1213 6.62939 11.8478C7.03986 11.7588 7.44955 11.7588 7.85923 11.8478C8.1691 11.9099 8.46594 12.0289 8.73812 12.1979C9.0103 12.3669 9.25265 12.5828 9.45332 12.8348C9.65399 13.0868 9.80959 13.3705 9.91244 13.6732C10.0153 13.9759 10.0634 14.2926 10.0544 14.6094C9.96541 15.0191 9.96541 15.4288 10.0544 15.8385C10.121 16.565 10.347 17.2625 10.7118 17.881C11.4582 19.1415 12.7533 20 14.1802 20C15.6071 20 16.9023 19.1415 17.6486 17.881C18.0134 17.2625 18.2394 16.565 18.3061 15.8385C18.3951 15.4288 18.3951 15.0191 18.3061 14.6094C18.2971 14.2926 18.2489 13.9759 18.1461 13.6732C18.0432 13.3705 17.8876 13.0868 17.687 12.8348C17.4863 12.5828 17.244 12.3669 16.9718 12.1979C16.6996 12.0289 16.4028 11.9099 16.0929 11.8478C16.5026 11.7588 16.9123 11.7588 17.322 11.8478C17.4373 11.1383 17.3061 10.4202 16.9427 9.78284C16.5794 9.14552 16.0013 8.61869 15.2818 8.2713C14.5623 7.92391 13.7383 7.77336 12.926 7.84008C12.1137 7.9068 11.3484 8.18784 10.7118 8.64964"
          transform="matrix(0.85, 0.4, -0.4, 0.85, 4, 0)"
          stroke="#5EE783"
          strokeWidth="1.8"
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
              <DropdownMenuItem>Perfíl</DropdownMenuItem>
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
