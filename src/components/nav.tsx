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
} from 'lucide-react';
import React from 'react';

const navItems = [
  {
    href: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
    subItems: [
        { href: '/', icon: LayoutDashboard, label: 'Principal' },
        { href: '/#performance', icon: BarChart, label: 'Desempeño' },
        { href: '/#retention', icon: Target, label: 'Retención' },
    ]
  },
  {
    href: '/classes',
    icon: BookOpenCheck,
    label: 'Mis Clases',
    subItems: [
        { href: '/classes#regular', icon: Calendar, label: 'Regulares' },
        { href: '/classes#coaching', icon: Briefcase, label: 'Coaching' },
        { href: '/classes#bootcamps', icon: Dumbbell, label: 'Bootcamps' },
    ]
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

  const handleLinkClick = (isSubItem: boolean = false) => {
    if (openMobile && isSubItem) {
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
          {item.subItems ? (
             <>
                <SidebarMenuButton
                    onClick={() => toggleSubMenu(item.label)}
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    data-state={openSubMenus[item.label] ? 'open' : 'closed'}
                >
                    <item.icon />
                    <span>{item.label}</span>
                </SidebarMenuButton>
                {openSubMenus[item.label] && (
                    <SidebarMenuSub>
                        {item.subItems.map(subItem => (
                            <SidebarMenuItem key={subItem.href}>
                                <Link href={subItem.href} onClick={() => handleLinkClick(true)}>
                                    <SidebarMenuSubButton
                                        isActive={pathname === subItem.href.split('#')[0]}
                                    >
                                        <subItem.icon/>
                                        <span>{subItem.label}</span>
                                    </SidebarMenuSubButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenuSub>
                )}
            </>
          ) : (
            <Link href={item.href} onClick={() => handleLinkClick()}>
                <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
                >
                <item.icon />
                <span>{item.label}</span>
                </SidebarMenuButton>
            </Link>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
