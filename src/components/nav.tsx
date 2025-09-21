
"use client";

import Link from 'next/link';
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
    href: '/profile',
    icon: UserCircle,
    label: 'Perfíl',
  },
  {
    href: '/pro-plan',
    icon: Rocket,
    label: 'Plan Pro',
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
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
