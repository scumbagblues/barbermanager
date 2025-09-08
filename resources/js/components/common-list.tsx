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
    tableClassName?: string; // Clase personalizada para la tabla
}

export function CommonList<T extends { id: number }>({
    headers,
    data,
    caption,
    children,
}: ReusableTableProps<T>) {

    // Función para capitalizar la primera letra de un string
    const capitalize = (str: string) => {
        return str
            .split('_') // Divide el string en partes donde haya guiones bajos
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
            .join(' '); // Une las palabras con un espacio
    };

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
                                    {item[header as keyof T] != null ? String(item[header as keyof T]) : ""} {/* Manejar valores null */}
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