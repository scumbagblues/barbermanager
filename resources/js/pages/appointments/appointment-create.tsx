import { Transition } from '@headlessui/react';
import { useForm, usePage, Head } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState, useMemo } from 'react';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { type SharedData } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Creación de Citas',
        href: '/appointments/create',
    },
];

export default function AppointmentCreate() {
    const { flash, barbers, services, clients } = usePage<SharedData>().props;


    const { data, setData, post, errors, processing } = useForm<{
        barber_id: string;
        client_id: string;
        service_ids: string[];
        start_time: string;
        notes: string;
    }>({
        barber_id: '',
        client_id: '',
        service_ids: [],
        start_time: '',
        notes: '',
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
    

    // Calcular duración y precio total
    const totalDuration = useMemo(() => {
        return services
            ?.filter(s => data.service_ids.includes(String(s.id)))
            .reduce((acc, s) => acc + Number(s.duration ?? 0), 0) ?? 0;
    }, [data.service_ids, services]);

    const totalPrice = useMemo(() => {
        return services
            ?.filter(s => data.service_ids.includes(String(s.id)))
            .reduce((acc, s) => acc + Number(s.price ?? 0), 0) ?? 0;
    }, [data.service_ids, services]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.service_ids.length === 0) {
            alert('Debes seleccionar al menos un servicio');
            return;
        }
        post(route('appointments'), {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    barber_id: '',
                    client_id: '',
                    service_ids: [],
                    start_time: '',
                    notes: '',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Creación de Citas" />
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
                    <HeadingSmall title="Creación de Citas" description="Información de Citas" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="barber_id">Barbero</Label>
                            <Select
                                value={data.barber_id} // Vincula el valor del Select al estado barber_id
                                onValueChange={(value) => setData('barber_id', value)} // Actualiza barber_id cuando cambia el valor
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Lista de barberos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Barberos</SelectLabel>
                                    {barbers?.map((barber) => (
                                        <SelectItem key={barber.id} value={String(barber.id)}>
                                            {barber.name}
                                        </SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError className="mt-2" message={errors.barber_id} />
                        </div>

                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="client_id">Cliente</Label>

                            <Select
                                value={data.client_id} // Vincula el valor del Select al estado client_id
                                onValueChange={(value) => setData('client_id', value)} // Actualiza client_id cuando cambia el valor
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Lista de clientes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Clientes</SelectLabel>
                                    {clients?.map((client) => (
                                        <SelectItem key={client.id} value={String(client.id)}>
                                            {client.name}
                                        </SelectItem>
                                    ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError className="mt-2" message={errors.client_id} />
                        </div>


                        <div className="grid gap-2 max-w-md">
                            <Label>Servicios</Label>
                            <div className="flex flex-col gap-2">
                                {services?.map((service) => (
                                    <label key={service.id} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value={service.id}
                                            checked={data.service_ids.includes(String(service.id))}
                                            onChange={e => {
                                                const id = String(service.id);
                                                setData('service_ids',
                                                    e.target.checked
                                                        ? [...data.service_ids, id]
                                                        : data.service_ids.filter(sid => sid !== id)
                                                );
                                            }}
                                        />
                                        {service.name} <span className="text-xs text-gray-500">({service.duration} min, ${Number(service.price ?? 0)})</span>
                                    </label>
                                ))}
                            </div>
                            <InputError className="mt-2" message={errors.service_ids} />
                        </div>

                        <div className="grid gap-2 max-w-md">
                            <Label>Duración total</Label>
                            <div className="font-semibold">{totalDuration} minutos</div>
                        </div>
                        <div className="grid gap-2 max-w-md">
                            <Label>Precio total</Label>
                            <div className="font-semibold">{totalPrice.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</div>
                        </div>

                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="start_time">Fecha y hora de inicio</Label>

                            <Input
                                id="start_time"
                                type="datetime-local"
                                min="100"
                                className="mt-1 block w-full"
                                value={data.start_time}
                                onChange={(e) => setData('start_time', e.target.value)}
                                required
                                placeholder="Fecha y hora de inicio"
                            />

                            <InputError className="mt-2" message={errors.start_time} />
                        </div>

                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="notes">Notas</Label>

                            <Input
                                id="notes"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                required
                                placeholder="Notas"
                            />

                            <InputError className="mt-2" message={errors.notes} />
                        </div>
                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>    
    );
}    
