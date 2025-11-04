
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {
  BookOpenCheck,
  LayoutDashboard,
  MessageSquare,
  Rocket,
  Search,
  Settings,
  UserCircle,
  Building,
  TrendingUp,
  BarChart,
  Target,
  Dumbbell,
  Briefcase,
  Calendar,
  Users,
  Beaker,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import React from 'react';

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
    href: '/students',
    icon: Users,
    label: 'Estudiantes',
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
  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});

  const handleLinkClick = () => {
    if (openMobile) {
      setOpenMobile(false);
    }
  };

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus(prev => ({...prev, [label]: !prev[label]}));
  }

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
