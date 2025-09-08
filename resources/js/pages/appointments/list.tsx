import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CommonList } from '@/components/common-list';
import AppointmentsLayout  from '@/layouts/appointments/layout';
import { DeleteAppointment } from '@/components/delete-appointment';
import { ChangeStatusAppointment } from '@/components/change-status-appointment';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión de Citas',
        href: '/appointments',
    },
];

export default function Appointments() {
    const { appointments, flash } = usePage<SharedData>().props;

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

    const headers = ['fecha_cita', 'cliente', 'barbero', 'servicios', 'precio', 'status', 'Actions'];

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
            <Head title="Configuración de citas" />
            <AppointmentsLayout>
                <div className="mx-auto flex h-full flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min">
                        <div className="w-full">
                            <CommonList
                                headers={headers}
                                data={appointments || []}
                                caption="Lista de Citas."
                                
                            >
                                {(appointment) => (
                                    <div className="flex gap-2">
                                        <ChangeStatusAppointment 
                                            appointmentId={appointment.id}  currentStatus={appointment.status} />
                                        <DeleteAppointment appointmentId={appointment.id} />
                                    </div>
                                )}
                            </CommonList>
                        </div>
                    </div>
                </div>
            </AppointmentsLayout>
        </AppLayout>
    );
}
