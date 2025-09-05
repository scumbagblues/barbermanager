import { usePage } from '@inertiajs/react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Settings, LayoutGrid, Scissors, CalendarIcon, Users, List } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestión de la barbería',
        url: '/barbers',
        icon: Scissors,
    },
    {
        title: 'Gestión de clientes',
        url: '/clients',
        icon: Users,
    },
    {
        title: 'Gestión de servicios',
        url: '/services',
        icon: List,
    },
    {
        title: 'Citas',
        url: '/appointments',
        icon: CalendarIcon,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Conf. de la barbería',
        url: '/barber-settings',
        icon: Settings,
    },
    
];

export function AppSidebar() {
    const { barberShopName } = usePage().props;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo title={barberShopName as string}/>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
