import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type SharedData } from '@/types';
import HeadingSmall from '@/components/heading-small';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Barber Management',
        href: '/barbers',
    },
];

export default function EditBarber() {

    const { flash, barber } = usePage<SharedData>().props; 

    const { data, setData, put, errors, processing } = useForm({
            name: barber?.name,
            email: barber?.email,
            phone: barber?.phone,
            address: barber?.address,
        });
    
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
        
        const submit: FormEventHandler = (e) => {
            e.preventDefault();
            put(route('barbers.update', { id: barber?.id}), {
                preserveScroll: true,
            });
        };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Barber Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                        <Transition
                            show={showSuccess}
                            enter="transition ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            >
                            <div className="bg-green-100 text-green-800 p-4 rounded-md">
                                {flash?.success ?? ''}
                            </div>
                        </Transition>
                        <div className="space-y-6">
                            <HeadingSmall title="Barber creation" description="Barber information" />

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-2 max-w-md">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="grid gap-2 max-w-md">
                                    <Label htmlFor="email">Email</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError className="mt-2" message={errors.email} />
                                </div>

                                <div className="grid gap-2 max-w-md">
                                    <Label htmlFor="address">Phone</Label>

                                    <Input
                                        id="phone"
                                        type="phone"
                                        className="mt-1 block w-full"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                        placeholder="Phone"
                                    />

                                    <InputError className="mt-2" message={errors.phone} />
                                </div>

                                <div className="grid gap-2 max-w-md">
                                    <Label htmlFor="address">Address</Label>

                                    <Input
                                        id="address"
                                        type="address"
                                        className="mt-1 block w-full"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        required
                                        placeholder="Address"
                                    />

                                    <InputError className="mt-2" message={errors.address} />
                                </div>

                        
                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Save</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
