import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { type SharedData } from '@/types';


export function CreateClient() {
    const { flash , barbers } = usePage<SharedData>().props;


    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        barber_id: '',
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
        post(route('clients'), {
            preserveScroll: true,
            onSuccess: () => {
                // Restablecer el estado del formulario
                setData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    barber_id: '',
                });
            },
        });
    };

    return (

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
                    <HeadingSmall title="Creación de clientes" description="Información de clientes" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Nombre completo"
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
                                placeholder="Email"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="address">Telefono</Label>

                            <Input
                                id="phone"
                                type="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                placeholder="Telefono"
                            />

                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="address">Dirección</Label>

                            <Input
                                id="address"
                                type="address"
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                required
                                placeholder="Direccion"
                            />

                            <InputError className="mt-2" message={errors.address} />
                        </div>

                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="address">Barbero</Label>
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
                        </div>

                
                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar</Button>
                        </div>
                    </form>
                </div>
            </div>    
    );
}    