import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export function TablePagination({ page, setPage, totalPages }: TablePaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            size="default"
            onClick={e => { e.preventDefault(); if (page > 1) setPage(page - 1); }}
            aria-disabled={page === 1}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              size="default"
              isActive={page === i + 1}
              onClick={e => { e.preventDefault(); setPage(i + 1); }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            size="default"
            onClick={e => { e.preventDefault(); if (page < totalPages) setPage(page + 1); }}
            aria-disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
