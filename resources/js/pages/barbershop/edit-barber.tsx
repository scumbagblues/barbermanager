import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type SharedData, type Schedule, type Vacation } from '@/types';
import HeadingSmall from '@/components/heading-small';


type BarberFormData = {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    vacation_date?: string;
    vacations?: Vacation[];
    color?: string;
    [key: `schedule_${number}_start`]: string;
    [key: `schedule_${number}_end`]: string;
};


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Barber Management',
        href: '/barbers',
    },
];

export default function EditBarber() {
    // Estado para mostrar error de fecha
    const [vacationDateError, setVacationDateError] = useState<string | null>(null);

    const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];


    const { flash, barber, schedules = [], vacations } = usePage<SharedData>().props;

    // Tipar schedules correctamente
    const safeSchedules: Schedule[] = Array.isArray(schedules) ? schedules as Schedule[] : [];

    // Construir el objeto inicial del formulario con los datos del backend
    const initialForm: BarberFormData = {
        name: barber?.name,
        email: barber?.email,
        phone: barber?.phone,
        address: barber?.address,
        color: barber?.color ?? '#000000',
        vacations: Array.isArray(vacations) ? vacations : [],
    };

    safeSchedules.forEach((sch) => {
        initialForm[`schedule_${sch.day_of_week}_start`] = sch.start_hour;
        initialForm[`schedule_${sch.day_of_week}_end`] = sch.end_hour;
    });

    const { data, setData, put, errors, processing } = useForm<BarberFormData>(initialForm);
    
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
            <Head title="Gestión de Barberos" />
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
                            <HeadingSmall title="Creación de barberos" description="Información del barbero" />

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid max-w-md gap-2">
                                    <Label htmlFor="name">Nombre</Label>
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

                                <div className="grid max-w-md gap-2">
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

                                <div className="grid max-w-md gap-2">
                                    <Label htmlFor="address">Telefono</Label>

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

                                <div className="grid max-w-md gap-2">
                                    <Label htmlFor="address">Dirección</Label>

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

                                {/* Horarios por día */}
                                <div className="space-y-2">
                                    <Label>Horarios por día</Label>
                                    {weekDays.map((day, idx) => (
                                        <div key={day} className="flex items-center gap-2">
                                            <span className="w-24">{day}</span>
                                            <Input
                                                type="time"
                                                value={data[`schedule_${idx}_start`] || ''}
                                                onChange={(e) => setData(`schedule_${idx}_start`, e.target.value)}
                                                className="w-28"
                                            />
                                            <span>a</span>
                                            <Input
                                                type="time"
                                                value={data[`schedule_${idx}_end`] || ''}
                                                onChange={(e) => setData(`schedule_${idx}_end`, e.target.value)}
                                                className="w-28"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Vacaciones */}
                                <div className="space-y-2">
                                    <Label>Días de vacaciones</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="date"
                                            value={data.vacation_date || ''}
                                            onChange={(e) => {
                                                setData('vacation_date', e.target.value);
                                                setVacationDateError(null);
                                            }}
                                            className="w-40"
                                        />
                                        <Button
                                            type="button"
                                            disabled={!!data.vacation_date && new Date(data.vacation_date) < new Date(new Date().toISOString().slice(0, 10))}
                                            onClick={() => {
                                                if (!data.vacations) setData('vacations', []);
                                                if (data.vacation_date && !data.vacations?.includes(data.vacation_date)) {
                                                    // Validar fecha
                                                    if (new Date(data.vacation_date) < new Date(new Date().toISOString().slice(0, 10))) {
                                                        setVacationDateError('No puedes agregar días en el pasado');
                                                        return;
                                                    }
                                                    setData('vacations', [...(data.vacations || []), data.vacation_date]);
                                                    setData('vacation_date', '');
                                                }
                                            }}
                                        >
                                            Agregar
                                        </Button>
                                        {vacationDateError && (
                                            <span className="text-red-600 text-sm ml-2">{vacationDateError}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {(data.vacations || []).map((date: string) => (
                                            <div key={date} className="flex items-center gap-2 rounded bg-gray-100 px-2 py-1">
                                                <span>{date}</span>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        setData(
                                                            'vacations',
                                                            (data.vacations || []).filter((d: string) => d !== date),
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid max-w-md gap-2">
                                    <Label htmlFor="color">Color identificador</Label>
                                    <input
                                        type="color"
                                        id="color"
                                        name="color"
                                        value={data.color}
                                        onChange={e => setData('color', e.target.value)}
                                        className="w-12 h-8 rounded border"
                                    />
                                    <InputError className="mt-2" message={errors.color} />
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
