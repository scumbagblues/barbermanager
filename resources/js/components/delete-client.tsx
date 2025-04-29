import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function DeleteClient({ clientId }: { clientId: number }) {

    const { delete: destroy, processing, reset, clearErrors } = useForm({ clientId });
    const deleteClient: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('clients.destroy', {id: clientId }), {
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
                        <Button variant="destructive">Delete client</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Are you sure you want to delete this client?</DialogTitle>
                        <DialogDescription>
                            Once this client is deleted, all of its resources and data will also be permanently deleted.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteClient}>
                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">Delete Client</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
        </div>
    );
}
