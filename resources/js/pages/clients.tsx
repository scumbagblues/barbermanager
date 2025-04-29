import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CreateClient } from '@/components/create-client';
import { DeleteClient } from '@/components/delete-client';
import { Button } from '@/components/ui/button';
import { CommonList } from '@/components/common-list';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients Management',
        href: '/clients',
    },
];

export default function Clients() {
    const { clients } = usePage<SharedData>().props;
     console.log(clients);
    const headers = ['name', 'email', 'phone', 'barber_name', 'Actions'];
    
    const handleEdit = (id: number) => {
        router.visit(route('clients.edit', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <CreateClient />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    
                <CommonList
                    headers={headers}
                    data={clients || []} // Si clients es undefined, pasa un array vacío
                    caption="A list of your clients."
                >
                    {(client) => (
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm" onClick={() => handleEdit(client.id)}>
                                Edit
                            </Button>
                            <DeleteClient clientId={client.id} />
                        </div>
                    )}
                </CommonList>
                   
                </div>
            </div>
        </AppLayout>
    );
}
