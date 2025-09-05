import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CreateService } from '@/components/create-service';
import { DeleteService } from '@/components/delete-service';
import { Button } from '@/components/ui/button';
import { CommonList } from '@/components/common-list';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión de Servicios',
        href: '/services',
    },
];

export default function Clients() {
    const headers = ['name', 'duration', 'description', 'price', 'Actions'];
    const { services } = usePage<SharedData>().props;
    const handleEdit = (id: number) => {
        router.visit(route('services.edit', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Servicios" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <CreateService />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    
                <CommonList
                    headers={headers}
                    data={services || []} // Si services es undefined, pasa un array vacío
                    caption="Lista de servicios."
                >
                    {(service) => (
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm" onClick={() => handleEdit(service.id)}>
                                Edit
                            </Button>
                            <DeleteService serviceId={service.id} />
                        </div>
                    )}
                </CommonList>
                   
                </div>
            </div>
        </AppLayout>
    );
}
