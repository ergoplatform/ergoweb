import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  total: number;
  pageSize: number;
  basePath: string; // e.g. "/blog" or `/category/${tag}`
  query?: Record<string, string | number | undefined>; // extra query params like type=news
};

function buildHref(
  basePath: string,
  page: number,
  query?: Record<string, string | number | undefined>,
) {
  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
    });
  }
  params.set('page', String(page));
  const search = params.toString();
  return `${basePath}?${search}`;
}

export default function Pagination({
  currentPage,
  total,
  pageSize,
  basePath,
  query,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, currentPage), totalPages);

  // Build a small window of page numbers around current page
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }
  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={page > 1 ? buildHref(basePath, page - 1, query) : '#'}
        className={`px-3 py-1 rounded border ${
          page > 1
            ? 'text-brand-orange border-brand-orange hover:bg-brand-orange/10'
            : 'text-gray-400 border-gray-300 cursor-not-allowed'
        }`}
        aria-disabled={page <= 1}
        tabIndex={page > 1 ? 0 : -1}
      >
        Prev
      </Link>

      {start > 1 ? (
        <>
          <Link
            href={buildHref(basePath, 1, query)}
            className={`px-3 py-1 rounded border ${
              page === 1
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'text-brand-orange border-brand-orange hover:bg-brand-orange/10'
            }`}
          >
            1
          </Link>
          {start > 2 ? <span className="px-2 text-gray-500">...</span> : null}
        </>
      ) : null}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(basePath, p, query)}
          className={`px-3 py-1 rounded border ${
            p === page
              ? 'bg-brand-orange text-white border-brand-orange'
              : 'text-brand-orange border-brand-orange hover:bg-brand-orange/10'
          }`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </Link>
      ))}

      {end < totalPages ? (
        <>
          {end < totalPages - 1 ? <span className="px-2 text-gray-500">...</span> : null}
          <Link
            href={buildHref(basePath, totalPages, query)}
            className={`px-3 py-1 rounded border ${
              page === totalPages
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'text-brand-orange border-brand-orange hover:bg-brand-orange/10'
            }`}
          >
            {totalPages}
          </Link>
        </>
      ) : null}

      <Link
        href={page < totalPages ? buildHref(basePath, page + 1, query) : '#'}
        className={`px-3 py-1 rounded border ${
          page < totalPages
            ? 'text-brand-orange border-brand-orange hover:bg-brand-orange/10'
            : 'text-gray-400 border-gray-300 cursor-not-allowed'
        }`}
        aria-disabled={page >= totalPages}
        tabIndex={page < totalPages ? 0 : -1}
      >
        Next
      </Link>
    </nav>
  );
}
