"use client";

import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  BookOpenCheck,
  LayoutDashboard,
  Rocket,
  Search,
  Settings,
  UserCircle,
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
    href: '/pro-plan',
    icon: Rocket,
    label: 'Plan Pro',
  },
  {
    href: '/profile',
    icon: UserCircle,
    label: 'Perfíl',
  },
  {
    href: '/settings',
    icon: Settings,
    label: 'Configuraciones',
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <a href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
