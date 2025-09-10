import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import AppointmentsLayout  from '@/layouts/appointments/layout';
import { DeleteAppointment } from '@/components/delete-appointment';
import { ChangeStatusAppointment } from '@/components/change-status-appointment';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
// importación eliminada: Pagination no se usa
type Appointment = {
    id: number;
    fecha_cita: string;
    cliente: string;
    barbero: string;
    servicios: string[];
    precio: string | number;
    status: string;
};
import { TablePagination } from '@/components/ui/table-pagination';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestión de Citas',
        href: '/appointments',
    },
];

export default function Appointments() {
    const { appointments, flash } = usePage<{ appointments: Appointment[]; flash: { success?: string } }>().props;
    const [showSuccess, setShowSuccess] = useState(!!flash?.success);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    // Filtrado por búsqueda
    const filtered = (appointments || []).filter(a =>
        a.cliente.toLowerCase().includes(search.toLowerCase()) ||
        a.barbero.toLowerCase().includes(search.toLowerCase()) ||
        a.status.toLowerCase().includes(search.toLowerCase()) ||
        a.servicios.join(', ').toLowerCase().includes(search.toLowerCase()) ||
        a.fecha_cita.toLowerCase().includes(search.toLowerCase())
    );

    // Paginación
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(filtered.length / pageSize);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
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
            <Head title="Configuración de citas" />
            <AppointmentsLayout>
                <div className="mx-auto flex h-full flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                    <Input
                        placeholder="Busqueda por fecha, cliente, barbero, servicio o status..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1); }}
                        className="mb-4 max-w-sm"
                    />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Barbero</TableCell>
                                <TableCell>Servicios</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated.map(appointment => (
                                <TableRow key={appointment.id}>
                                    <TableCell>{appointment.fecha_cita}</TableCell>
                                    <TableCell>{appointment.cliente}</TableCell>
                                    <TableCell>{appointment.barbero}</TableCell>
                                    <TableCell>
                                        <div className="whitespace-pre-line break-words">
                                            {appointment.servicios.map((servicio, idx) => (
                                                <span key={idx}>
                                                    {servicio}
                                                    {idx < appointment.servicios.length - 1 ? '\n' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>{appointment.precio}</TableCell>
                                    <TableCell>{appointment.status}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <ChangeStatusAppointment appointmentId={appointment.id} currentStatus={appointment.status} redirectTo="/appointments" />
                                            <DeleteAppointment appointmentId={appointment.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                </div>
            </AppointmentsLayout>
        </AppLayout>
    );
}
