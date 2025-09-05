import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type SharedData } from '@/types';


export function CreateService() {
    const { flash } = usePage<SharedData>().props;


    const { data, setData, post, errors, processing } = useForm({
        name: '',
        duration: '',
        description: '',
        price: '',
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
        post(route('services'), {
            preserveScroll: true,
            onSuccess: () => {
                // Restablecer el estado del formulario
                setData({
                    name: '',
                    duration: '',
                    description: '',
                    price: '',
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
                    <HeadingSmall title="Creación de Servicios" description="Información de Servicios" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2 max-w-md">
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

                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="duration">Duración</Label>

                            <Input
                                id="duration"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                required
                                autoComplete="duration"
                                placeholder="Duración en minutos"
                            />

                            <InputError className="mt-2" message={errors.duration} />
                        </div>

                        <div className="grid gap-2 max-w-md">
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

                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="price">Precio</Label>

                            <Input
                                id="Price"
                                type="number"
                                min="100"
                                className="mt-1 block w-full"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
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
    );
}    