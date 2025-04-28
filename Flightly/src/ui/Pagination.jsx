import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import clsx from "clsx";

// Pagination Component
const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={clsx("mx-auto flex w-full py-2 justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

// PaginationContent Component
const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={clsx("flex flex-row items-center gap-8 ", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

// PaginationItem Component
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={clsx("text-white", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

// PaginationLink Component
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className="text-white font-Rangile"
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

// PaginationPrevious Component
const PaginationPrevious = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={clsx("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

// PaginationNext Component
const PaginationNext = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={clsx("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

// PaginationEllipsis Component
const PaginationEllipsis = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={clsx("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
