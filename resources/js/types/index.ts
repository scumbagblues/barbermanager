import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    barberShopName: string;
    quote: { message: string; author: string };
    auth: Auth;
    barberShopSettings?: BarberShopSettings;
    flash?: {
        success?: string;
        error?: string;
    };
    barber?: Barber;
    client?: Client;
    barbers?: Barber[]; // Lista de barberos
    clients?: Client[]; // Lista de barberos
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface BarberShopSettings {
    name: string;
    address: string;
    phone: string;
    email: string;
    [key: string]: string;
}

export interface Barber {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    barber_id: number;
    barber_name: string;
    [key: string]: unknown; // This allows for additional properties...
}

