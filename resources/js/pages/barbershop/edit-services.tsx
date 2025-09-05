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
        title: 'Services Management',
        href: '/services',
    },
];

export default function EditClient() {

    const { flash, service } = usePage<SharedData>().props; 

    const { data, setData, put, errors, processing } = useForm({
            name: service?.name,
            duration: service?.duration,
            description: service?.description,
            price: service?.price,
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
            put(route('services.update', { id: service?.id}), {
                preserveScroll: true,
            });
        };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Servicios" />
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
                            <div className="rounded-md bg-green-100 p-4 text-green-800">{flash?.success ?? ''}</div>
                        </Transition>
                        <div className="space-y-6">
                            <HeadingSmall title="Barber creation" description="Barber information" />

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid max-w-md gap-2">
                                    <Label htmlFor="name">Nombre del Servicio</Label>
                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Nombre del servicio"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="grid max-w-md gap-2">
                                    <Label htmlFor="duration">Duración</Label>

                                    <Input
                                        id="duration"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.duration}
                                        onChange={(e) => setData('duration', Number(e.target.value))}
                                        required
                                        autoComplete="duration"
                                        placeholder="Duración en minutos"
                                    />

                                    <InputError className="mt-2" message={errors.duration} />
                                </div>

                                <div className="grid max-w-md gap-2">
                                    <Label htmlFor="description">Descripción</Label>

                                    <Input
                                        id="description"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                        placeholder="Descripción"
                                    />

                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div className="grid max-w-md gap-2">
                                    <Label htmlFor="price">Precio</Label>

                                    <Input
                                        id="Price"
                                        type="number"
                                        min="100"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) => setData('price', Number(e.target.value))}
                                        required
                                        placeholder="Precio"
                                    />

                                    <InputError className="mt-2" message={errors.price} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Guardar</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
