"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BookOpenCheck,
  LayoutDashboard,
  MessageSquare,
  Rocket,
  Search,
  Settings,
  UserCircle,
  Building
} from 'lucide-react';

const navItems = [
  {
    href: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/classes',
    icon: BookOpenCheck,
    label: 'Mis Clases',
  },
  {
    href: '/search-classes',
    icon: Search,
    label: 'Buscar Clases',
  },
   {
    href: '/academy',
    icon: Building,
    label: 'Mi Academia',
  },
  {
    href: '/communication',
    icon: MessageSquare,
    label: 'Comunicación',
  },
    {
    href: '/profile',
    icon: UserCircle,
    label: 'Perfil',
  },
  {
    href: '/pro-plan',
    icon: Rocket,
    label: 'Planes',
  },
  {
    href: '/settings',
    icon: Settings,
    label: 'Configuraciones',
  },
];

export default function Nav() {
  const pathname = usePathname();
  const { openMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (openMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} onClick={handleLinkClick}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
