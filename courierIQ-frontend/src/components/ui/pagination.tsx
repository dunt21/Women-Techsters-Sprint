import React from "react";
import { Button } from "@/components/ui/button";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // If there's only 1 page (or 0), we don't really need to show the pagination,
  // but returning the disabled buttons keeps the UI structure intact.
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages || totalPages === 0;

  return (
    <div className="p-4 border-t border-border flex items-center justify-between bg-card">
      <Button
        variant="outline"
        className="h-10 rounded-xl"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <LuChevronLeft className="w-4 h-4 mr-1" /> Previous
      </Button>
      
      <span className="text-sm font-medium text-muted-foreground">
        Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
      </span>
      
      <Button
        variant="outline"
        className="h-10 rounded-xl"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next <LuChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};
