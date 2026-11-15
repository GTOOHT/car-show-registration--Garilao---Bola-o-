interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const buttonBase =
  "rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 " +
  "disabled:cursor-not-allowed disabled:opacity-40";

export function Pagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  loading,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  const goTo = (target: number) => {
    if (!loading && target >= 1 && target <= totalPages) onPageChange(target);
  };

  // Page number buttons: show up to 5 pages around the current one.
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    const windowStart = Math.min(Math.max(1, page - 2), Math.max(1, totalPages - 4));
    return windowStart + i;
  });

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-3"
      aria-label="Registrations pagination"
    >
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-700">{start}–{end}</span> of{" "}
        <span className="font-semibold text-slate-700">{totalCount}</span>
      </p>

      <div className="flex items-center gap-2">
        <label htmlFor="page-size" className="text-sm text-slate-500">
          Rows per page
        </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={loading || page <= 1}
          className={`${buttonBase} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
        >
          Prev
        </button>

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => goTo(p)}
            disabled={loading}
            aria-current={p === page ? "page" : undefined}
            className={`${buttonBase} border ${
              p === page
                ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={loading || page >= totalPages}
          className={`${buttonBase} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
