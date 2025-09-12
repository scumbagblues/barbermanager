import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Calendar } from "@/components/ui/calendar";
import { ChangeStatusAppointment } from '@/components/change-status-appointment';
import { Clock, CalendarDays, TrendingUp, CheckCircle2, XCircle } from "lucide-react";

import { Kpi } from '@/components/kpi';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];


export default function Dashboard() {
    // ...existing code...
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [showCalendar, setShowCalendar] = useState(false);

    const getButtonDateText = () => {
        const isToday = !selectedDate || (selectedDate && selectedDate.toDateString() === new Date().toDateString());
        if (isToday) return 'Hoy';
        if (selectedDate) {
            return selectedDate.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
        return 'Hoy';
    };
    const buttonDateText = getButtonDateText();

    const { flash } = usePage<SharedData>().props;
    const [showSuccess, setShowSuccess] = useState(!!flash?.success);
        useEffect(() => {
                if (flash?.success) {
                    setShowSuccess(true);
                    const timer = setTimeout(() => {
                        setShowSuccess(false); // Oculta el mensaje después de 3 segundos
                    }, 3000);
        
                    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
                }
            }, [flash?.success]);

    const { todayAppointments, todayClients } = usePage<SharedData>().props;
    const totalConfirmed = todayAppointments?.filter(a => a.status === 'Confirmada').length ?? 0;
    const totalPending = todayAppointments?.filter(a => a.status === 'Pendiente').length ?? 0;
    const totalCancelled = todayAppointments?.filter(a => a.status === 'Cancelada').length ?? 0;
    const incomingDay = todayAppointments?.filter(a => a.status === 'Confirmada').reduce((sum, a) => sum + (Number(a.price) || 0), 0) ?? 0;
    const today = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const handleCreateAppointment = () => {
        router.visit(route('appointments.create'));
    };

    // ...existing code...

    const handleDateChange = (date?: Date) => {
        setSelectedDate(date);
        setShowCalendar(false);
        if (date) {
            router.visit(route('dashboard'), {
                method: 'get',
                data: {
                    date: date.toISOString().slice(0, 10),
                },
                preserveState: true,
                preserveScroll: true,
            });
        }
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Transition
                show={showSuccess}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="rounded-md bg-green-100 p-4 text-green-800">{flash?.success ?? ''}</div>
            </Transition>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-6 flex items-center justify-end">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowCalendar(!showCalendar)}>
                            <CalendarDays className="mr-2 h-4 w-4"/>{buttonDateText}
                        </Button>
                        <Button onClick={handleCreateAppointment}>Crear cita</Button>
                    </div>
                    {showCalendar && (
                        <div className="fixed top-20 right-8 z-50 flex flex-col items-center">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateChange}
                                className="w-full rounded border bg-background shadow p-2 text-sm"
                            />
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Card: Citas de hoy */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Citas de hoy
                                <span className="text-muted-foreground ml-2 text-base font-normal">{today}</span>
                            </CardTitle>
                        </CardHeader>
                            <CardContent>
                                {Array.isArray(todayAppointments) && todayAppointments.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        {todayAppointments.map(appointment => (
                                            <div
                                                key={appointment.id}
                                                className="flex items-center justify-between rounded-2xl border p-3 bg-white"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">
                                                        {appointment.start_time} • {appointment.client}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {appointment.services.join(', ')} — {appointment.barber}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 min-h-[2rem]">
                                                    <span
                                                        style={{ backgroundColor: typeof appointment.barber_color === 'string' ? appointment.barber_color : '#ccc' }}
                                                        className="inline-block w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                                                        title={appointment.barber}
                                                    />
                                                    <Badge
                                                        className="h-6 flex items-center px-2 min-w-[90px] justify-center"
                                                        variant={
                                                            appointment.status === 'Pendiente'
                                                                ? 'default'
                                                                : appointment.status === 'Confirmada'
                                                                    ? 'secondary'
                                                                    : appointment.status === 'Cancelada'
                                                                        ? 'destructive'
                                                                        : 'outline'
                                                        }
                                                    >
                                                        {appointment.status}
                                                    </Badge>
                                                    <div className="flex items-center h-6">
                                                        <ChangeStatusAppointment appointmentId={appointment.id} currentStatus={appointment.status} redirectTo="/dashboard" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No appointments for today.</p>
                                )}
                            </CardContent>
                    </Card>
                    {/* Card: Resumen del día */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <TrendingUp className="h-4 w-4" /> Resumen del día
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Kpi label="Confirmadas" value={totalConfirmed} icon={<CheckCircle2 className="h-4 w-4"/>} />
                                <Kpi label="Pendientes" value={totalPending} icon={<Clock className="h-4 w-4"/>} />
                                <Kpi label="Canceladas" value={totalCancelled} icon={<XCircle className="h-4 w-4"/>} />
                                <Kpi label="Ingresos" value={`$${incomingDay}`} />
                                <Kpi label="Clientes Nuevos" value={Array.isArray(todayClients) ? todayClients.length : 0} />
                                <Kpi label="Servicios Realizados" value={totalConfirmed} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
