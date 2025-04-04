import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'BarberShop Settings',
        href: '/barber-settings',
    },
];


export default function Settings() {
    const { flash } = usePage<SharedData>().props;
    const { barberShopSettings } = usePage<SharedData>().props;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: barberShopSettings?.name,
        address: barberShopSettings?.address,
        phone: barberShopSettings?.phone,
        email: barberShopSettings?.email,
    });
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('barber-settings'), {
            preserveScroll: true,
        });
    };

    

    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shop Settings" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {flash?.success && (
                    <div className="bg-green-100 text-green-800 p-4 rounded-md">
                        {flash.success}
                    </div>
                )}
                <div className="space-y-6">
                    <HeadingSmall title="Shop information" description="Here is your shop information" />

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

                            <InputError className="mt-2" message={errors.email} />
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
                
                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>    
        </AppLayout>
    );
}    