import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { OrbitIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function ChangeStatusAppointment({ appointmentId, currentStatus, redirectTo }: { appointmentId: number, currentStatus: string, redirectTo?: string }) {

    const [status, setStatus] = useState(currentStatus);
    const [open, setOpen] = useState(false);
    const { put, setData, processing, reset, clearErrors } = useForm({ status, redirectTo });

    // Actualiza el campo status en el form cada vez que cambie el select
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setData('status', e.target.value);
    };

    const changeStatus: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('appointments.updateStatus', { id: appointmentId }), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
            },
            onFinish: () => {
                reset();
            },
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
        setOpen(false);
    };

    return (
        <div className="space-y-6">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Tooltip>
        <TooltipTrigger asChild>
            <span>
                <DialogTrigger asChild>
                    <Button variant="outline" aria-label="Cambiar estatus de la cita">
                        <OrbitIcon />
                    </Button>
                </DialogTrigger>
            </span>
        </TooltipTrigger>
        <TooltipContent>Cambiar estatus</TooltipContent>
    </Tooltip>
                    
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Cambiar estatus de la cita</DialogTitle>
                    <DialogDescription>
                        Selecciona el nuevo estatus para esta cita.
                    </DialogDescription>
                    <form className="space-y-6" onSubmit={changeStatus}>
                        <select
                            name="status"
                            id="status"
                            className="w-full border rounded p-2"
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Confirmada">Confirmada</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={closeModal}>
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={processing}>
                                Guardar Cambios
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
