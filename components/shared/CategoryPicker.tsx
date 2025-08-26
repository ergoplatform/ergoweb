import Link from 'next/link';
import { useState, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

type Category = {
  id: number | string;
  attributes: {
    name: string;
  };
};

type Props = {
  categories: Category[];
  categoryCounts?: Record<string, number> | null;
  className?: string;
};

export default function CategoryPicker({ categories, categoryCounts, className = '' }: Props) {
  const [open, setOpen] = useState(false);

  const sorted = useMemo(() => {
    const arr = Array.isArray(categories) ? [...categories] : [];
    return arr
      .map((c) => ({
        id: c.id,
        name: c?.attributes?.name as string,
        count: (categoryCounts ?? {})[c?.attributes?.name as string] ?? 0,
      }))
      .filter((c) => !!c.name)
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.name.localeCompare(b.name);
      });
  }, [categories, categoryCounts]);

  return (
    // Mobile-only by default; parent can toggle visibility with responsive utilities
    <div className={`relative z-20 ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="
          inline-flex items-center gap-2
          rounded-full px-4 py-2
          bg-brand-orange text-white
          border border-brand-orange-dark
          shadow-lg shadow-brand-orange/25
          transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange
        "
      >
        <span className="uppercase tracking-widest text-xs font-semibold">
          <FormattedMessage id="categoryPicker.categories" defaultMessage="Categories" />
        </span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="listbox"
          tabIndex={-1}
          className="
            absolute left-0 right-0 mt-2
            rounded-2xl overflow-hidden
            border border-white/40 dark:border-white/15
            bg-white/80 dark:bg-zinc-900/80
            backdrop-blur-md
            shadow-2xl
          "
        >
          <div className="max-h-80 overflow-auto p-2">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
              {sorted.map(({ id, name, count }) => (
                <Link
                  href={`/category/${encodeURIComponent(name)}`}
                  key={id}
                  onClick={() => setOpen(false)}
                  className="
                    group no-underline
                    rounded-xl
                    border border-gray-200/70 dark:border-white/10
                    bg-white/70 dark:bg-white/5
                    px-3 py-2
                    flex items-center justify-between
                    transition
                    hover:border-brand-orange hover:bg-brand-orange/10
                    focus:outline-none focus:ring-2 focus:ring-brand-orange
                  "
                >
                  <span className="truncate mr-2 text-sm text-gray-900 dark:text-white">
                    {name}
                  </span>
                  <span
                    className="
                      inline-flex items-center justify-center
                      min-w-[2.25rem] h-6
                      rounded-full
                      text-xs font-semibold
                      text-white
                      bg-brand-orange border border-brand-orange-dark
                      px-2
                    "
                  >
                    {count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-2 border-t border-white/40 dark:border-white/10 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                inline-flex items-center px-3 py-1.5 rounded-full
                text-xs font-semibold uppercase tracking-widest
                text-brand-orange border border-brand-orange
                bg-white hover:bg-brand-orange/10
                transition
              "
            >
              <FormattedMessage id="common.close" defaultMessage="Close" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
