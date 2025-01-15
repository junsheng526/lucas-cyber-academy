import { FC } from "react";

export interface PaginationProps {
  className?: string;
  currentPage: number; // Active page
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Callback when a page is clicked
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Render a single page item
  const renderPageItem = (page: number) => {
    const isActive = page === currentPage;
    const commonClasses =
      "inline-flex w-11 h-11 items-center justify-center rounded-full focus:outline-none focus:ring-2";

    if (isActive) {
      // Active page item
      return (
        <span
          key={page}
          className={`${commonClasses} bg-primary text-white focus:ring-primary`}
        >
          {page}
        </span>
      );
    }

    // Inactive page item
    return (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`${commonClasses} bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 focus:ring-blue-500`}
      >
        {page}
      </button>
    );
  };

  // Generate an array of pages to display
  const renderPageItems = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(renderPageItem(i));
    }
    return pages;
  };

  return (
    <nav className={`inline-flex space-x-1 text-base font-medium ${className}`}>
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 focus:outline-none focus:ring-blue-500 disabled:opacity-50"
      >
        &lt;
      </button>

      {/* Page numbers */}
      {renderPageItems()}

      {/* Next button */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 focus:outline-none focus:ring-blue-500 disabled:opacity-50"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
