import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps): JSX.Element | null {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="focus-ring btn-ghost rounded-lg bg-transparent p-2 disabled:opacity-30"
      >
        <FiChevronLeft size={15} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "focus-ring h-8 w-8 rounded-lg font-mono text-xs",
            page === currentPage ? "btn-primary border-none" : "btn-ghost bg-transparent",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="focus-ring btn-ghost rounded-lg bg-transparent p-2 disabled:opacity-30"
      >
        <FiChevronRight size={15} />
      </button>
    </nav>
  );
}
