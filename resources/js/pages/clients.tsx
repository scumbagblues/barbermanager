import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CreateClient } from '@/components/create-client';
import { DeleteClient } from '@/components/delete-client';
import { ClientsTable } from '@/components/clients-table';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión de Clientes',
        href: '/clients',
    },
];

export default function Clients() {
    const { clients } = usePage<SharedData>().props;
 
    const handleEdit = (id: number) => {
        router.visit(route('clients.edit', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuración de clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <CreateClient />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    
                <ClientsTable
                    clients={clients || []}
                    onEdit={handleEdit}
                    onDelete={id => <DeleteClient clientId={id} />}
                />
                   
                </div>
            </div>
        </AppLayout>
    );
}
