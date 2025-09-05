import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { CommonList } from '@/components/common-list';
import AppointmentsLayout  from '@/layouts/appointments/layout';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión de Citas',
        href: '/appointments',
    },
];

export default function Appointments() {
    const { appointments } = usePage<SharedData>().props;
 
    const headers = ['appointment_date', 'client_id', 'barber_id', 'service_id','status', 'Actions'];
    
    const handleEdit = (id: number) => {
        router.visit(route('appointmens.edit', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuración de citas" />
            <AppointmentsLayout>
                <div className="flex h-full max-w-screen-lg flex-col gap-4 rounded-xl p-4 mx-auto">
                    
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        
                    <CommonList
                        headers={headers}
                        data={appointments || []} // Si clients es undefined, pasa un array vacío
                        caption="Lista de Citas."
                    >
                        {(appointment) => (
                            <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(appointment.id)}>
                                    Editar
                                </Button>
                            </div>
                        )}
                    </CommonList>
                    
                    </div>
                </div>
            </AppointmentsLayout>
        </AppLayout>
    );
}
