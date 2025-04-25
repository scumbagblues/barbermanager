import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function DeleteBarber({ barberId }: { barberId: number }) {

    const { delete: destroy, processing, reset, clearErrors } = useForm({ barberId });
    const deleteBarber: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('barbers.destroy', {id: barberId }), {
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
                        <Button variant="destructive">Delete account</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Are you sure you want to delete this barber?</DialogTitle>
                        <DialogDescription>
                            Once this barber is deleted, all of its resources and data will also be permanently deleted.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteBarber}>
                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">Delete Barber</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
        </div>
    );
}
