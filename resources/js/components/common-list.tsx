import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface ReusableTableProps<T> {
    headers: string[]; // Encabezados de la tabla
    data: T[]; // Datos de la tabla
    caption?: string; // Texto opcional para el caption
    children: (item: T) => React.ReactNode; // Renderizado personalizado para las acciones
}

export function CommonList<T extends { id: number }>({
    headers,
    data,
    caption,
    children,
}: ReusableTableProps<T>) {

    // Función para capitalizar la primera letra de un string
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableHead key={index}>{capitalize(header)}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        {/* Renderizar solo las celdas que coincidan con las claves del objeto */}
                        {headers.map((header, index) => (
                            header !== 'Actions' ? (
                                <TableCell key={index} className="font-medium">
                                    {String(item[header as keyof T]) || ""}
                                </TableCell>
                            ) : null
                        ))}
                        {/* Renderizar las acciones personalizadas */}
                        <TableCell>
                            {children(item)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}