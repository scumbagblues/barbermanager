import { useState } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { TablePagination } from '@/components/ui/table-pagination';
import { Input } from '@/components/ui/input';
import { UserPenIcon } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

type Client = {
    id: number;
    name: string;
    email: string;
    phone: string;
    barber_name?: string;
};

interface ClientsTableProps {
    clients: Client[];
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => React.ReactNode;
}

export function ClientsTable({ clients, onEdit, onDelete }: ClientsTableProps) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Filtrado por búsqueda
    const filtered = (clients || []).filter((c: Client) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.toLowerCase().includes(search.toLowerCase()) ||
        (c.barber_name || '').toLowerCase().includes(search.toLowerCase())
    );

    // Paginación
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(filtered.length / pageSize);

    return (
        <div>
            <Input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Buscar por nombre, email, teléfono o barbero..."
                className="mb-4 max-w-sm"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Barbero</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginated.map((client: Client) => (
                        <TableRow key={client.id}>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>{client.phone}</TableCell>
                            <TableCell>{client.barber_name}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    {onEdit && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button onClick={() => onEdit(client.id)} className="btn btn-outline btn-sm" aria-label="Editar cliente">
                                                    <UserPenIcon />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>Editar cliente</TooltipContent>
                                        </Tooltip>
                                    )}
                                    {onDelete && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span>{onDelete(client.id)}</span>
                                            </TooltipTrigger>
                                            <TooltipContent>Eliminar cliente</TooltipContent>
                                        </Tooltip>
                                    )}
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
    );
}
