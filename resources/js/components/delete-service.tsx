import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function DeleteService({ serviceId }: { serviceId: number }) {

    const { delete: destroy, processing, reset, clearErrors } = useForm({ serviceId });
    const deleteService: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('services.destroy', {id: serviceId }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive"><Trash2 /></Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>¿Esta seguro de borrar este servicio?</DialogTitle>
                        <DialogDescription>
                            Una vez que este servicio sea borrado, todos sus recursos y datos también serán eliminados permanentemente.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteService}>
                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancelar
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">Borrar Servicio</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
        </div>
    );
}
