import Image from 'next/image';
import Link from 'next/link';
import ArrowRightWhite from '../icons/ArrowRightWhite';

type Project = {
  id: number;
  attributes: {
    title: string;
    group: string;
    description: string;
    url: string;
    button_text: string;
    image: {
      data?: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
  };
};

function FeatureCard({ project, span }: { project: Project; span?: 'tall' | 'wide' | 'normal' }) {
  // Derive an appropriate layout if no explicit span is provided (based on image aspect ratio)
  const w = project.attributes.image?.data?.attributes?.width ?? 0;
  const h = project.attributes.image?.data?.attributes?.height ?? 0;
  const effectiveSpan: 'tall' | 'wide' | 'normal' =
    span ?? (h > w * 1.2 ? 'tall' : w > h * 1.35 ? 'wide' : 'normal');

  const spanClasses =
    effectiveSpan === 'tall' ? 'lg:row-span-2' : effectiveSpan === 'wide' ? 'lg:col-span-2' : '';

  const isExternal = /^https?:\/\//i.test(project.attributes.url);

  const imageHeight =
    effectiveSpan === 'tall'
      ? 'h-[340px] sm:h-[400px] lg:h-[460px]'
      : effectiveSpan === 'wide'
      ? 'h-[260px] sm:h-[300px] lg:h-[360px]'
      : 'h-[240px] sm:h-[260px] lg:h-[280px]';

  const isCover = effectiveSpan !== 'normal';
  const containerPadding = isCover ? 'p-0' : 'p-2 sm:p-3 md:p-4';
  const containerFrame = isCover
    ? ''
    : 'border border-gray-200/50 dark:border-white/10 bg-white/40 dark:bg-zinc-800/50';
  return (
    <Link
      href={project.attributes.url}
      className={[
        'group relative flex flex-col h-full rounded-3xl ring-1 ring-black/5',
        'bg-white/60 dark:bg-zinc-900/40 shadow-sm p-5 md:p-6 pb-0 md:pb-0',
        'transition hover:shadow-lg hover:-translate-y-0.5 focus:outline-none',
        'focus-visible:ring-2 focus-visible:ring-brand-orange/50',
        'overflow-visible',
        spanClasses,
      ].join(' ')}
      aria-label={`Open ${project.attributes.title}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      <div
        className={[
          'relative rounded-2xl overflow-hidden w-full',
          containerFrame,
          imageHeight,
          containerPadding,
        ].join(' ')}
      >
        {project.attributes.image?.data?.attributes?.url ? (
          <Image
            src={project.attributes.image.data.attributes.url}
            alt={project.attributes.title || 'Project image'}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className={`${
              isCover ? 'object-cover' : 'object-contain'
            } pointer-events-none select-none transition-transform duration-500 group-hover:scale-[1.03]`}
            priority={effectiveSpan === 'tall'}
          />
        ) : (
          <div className="text-xs text-zinc-500">No image</div>
        )}
      </div>

      <div className={`mt-4 flex flex-col flex-1 gap-y-2 md:gap-y-3`}>
        <span className="inline-flex w-fit items-center px-3.5 py-1.5 rounded-full uppercase tracking-widest text-xs md:text-sm font-semibold text-[#585858] dark:text-gray-300 bg-white/70 dark:bg-white/5 border border-gray-200/50 dark:border-white/10">
          {project.attributes.group}
        </span>
        <h4 className="pl-2.5 font-subtitle-3-bold text-[32px] leading-tight heading-balance line-clamp-2">
          {project.attributes.title}
        </h4>
        <p className="pl-2.5 text-base md:text-[17px] text-[#807e7e] dark:text-[#807e7e] line-clamp-3">
          {project.attributes.description}
        </p>
      </div>
      <div className="-mx-5 md:-mx-6 mt-auto pt-3">
        <div className="bg-brand-orange hover:bg-[#ff6e32] transition-colors text-white rounded-b-3xl px-5 md:px-6 py-3 flex items-center justify-between">
          <span className="font-vinila-extended text-[14px] md:text-[16px]">
            {project.attributes.button_text}
          </span>
          <ArrowRightWhite className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}

export default FeatureCard;
