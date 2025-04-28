import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CreateBarber } from '@/components/create-barber';
import { DeleteBarber } from '@/components/delete-barber';
import { Button } from '@/components/ui/button';
import { CommonList } from '@/components/common-list';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Barber Management',
        href: '/barbers',
    },
];

export default function Barbers() {
    const { barbers } = usePage<SharedData>().props;

    const headers = ['name', 'email', 'phone', 'address', 'Actions'];
    
    const handleEdit = (id: number) => {
        router.visit(route('barbers.edit', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Barber Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <CreateBarber />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    
                <CommonList
                    headers={headers}
                    data={barbers || []} // Si barbers es undefined, pasa un array vacío
                    caption="A list of your barbers."
                >
                    {(barber) => (
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm" onClick={() => handleEdit(barber.id)}>
                                Edit
                            </Button>
                            <DeleteBarber barberId={barber.id} />
                        </div>
                    )}
                </CommonList>
                   
                </div>
            </div>
        </AppLayout>
    );
}
