import { FC } from "react";

interface CustomLink {
  label: string;
  href: string;
}

const DEMO_PAGINATION: CustomLink[] = [
  {
    label: "1",
    href: "#",
  },
  {
    label: "2",
    href: "#",
  },
  {
    label: "3",
    href: "#",
  },
  {
    label: "4",
    href: "#",
  },
];

export interface PaginationProps {
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ className = "" }) => {
  const renderItem = (pag: CustomLink, index: number) => {
    if (index === 0) {
      // ACTIVE PAGINATION ITEM
      return (
        <span
          key={index}
          className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {pag.label}
        </span>
      );
    }
    // INACTIVE PAGINATION ITEM
    return (
      <a
        key={index}
        href={pag.href}
        className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {pag.label}
      </a>
    );
  };

  return (
    <nav className={`inline-flex space-x-1 text-base font-medium ${className}`}>
      {DEMO_PAGINATION.map(renderItem)}
    </nav>
  );
};

export default Pagination;
