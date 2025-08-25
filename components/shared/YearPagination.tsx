import Link from 'next/link';

type YearPaginationProps = {
  currentYear: number;
  years: number[];
  basePath: string; // e.g. "/blog"
  query?: Record<string, string | number | undefined>; // extra query params like type=news
};

function buildHref(
  basePath: string,
  year: number,
  query?: Record<string, string | number | undefined>,
) {
  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
    });
  }
  params.set('year', String(year));
  const search = params.toString();
  return `${basePath}?${search}`;
}

export default function YearPagination({
  currentYear,
  years,
  basePath,
  query,
}: YearPaginationProps) {
  if (!years || years.length === 0) return null;

  const sorted = [...years].sort((a, b) => b - a); // desc
  const currentIndex = sorted.findIndex((y) => y === currentYear);
  const prevYear = currentIndex > 0 ? sorted[currentIndex - 1] : undefined;
  const nextYear =
    currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : undefined;

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Years">
      <Link
        href={prevYear ? buildHref(basePath, prevYear, query) : '#'}
        prefetch={false}
        className={`px-3 py-1 rounded border ${
          prevYear
            ? 'text-brand-orange border-brand-orange hover:bg-brand-orange/10'
            : 'text-gray-400 border-gray-300 cursor-not-allowed'
        }`}
        aria-disabled={!prevYear}
        tabIndex={prevYear ? 0 : -1}
      >
        Prev
      </Link>

      {sorted.map((y) => (
        <Link
          key={y}
          href={buildHref(basePath, y, query)}
          prefetch={false}
          className={`px-3 py-1 rounded border ${
            y === currentYear
              ? 'bg-brand-orange text-white border-brand-orange'
              : 'text-brand-orange border-brand-orange hover:bg-brand-orange/10'
          }`}
          aria-current={y === currentYear ? 'page' : undefined}
        >
          {y}
        </Link>
      ))}

      <Link
        href={nextYear ? buildHref(basePath, nextYear, query) : '#'}
        prefetch={false}
        className={`px-3 py-1 rounded border ${
          nextYear
            ? 'text-brand-orange border-brand-orange hover:bg-brand-orange/10'
            : 'text-gray-400 border-gray-300 cursor-not-allowed'
        }`}
        aria-disabled={!nextYear}
        tabIndex={nextYear ? 0 : -1}
      >
        Next
      </Link>
    </nav>
  );
}
