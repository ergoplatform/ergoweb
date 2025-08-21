import FeatureCard from './FeatureCard';
import LazyInView from '../../utils/LazyInView';

type Props = {
  projects?: any;
};

export default function FeaturesAndProjects(props: Props) {
  return (
    <section
      id="FeaturesAndProjects"
      aria-labelledby="features-projects-title"
      className="max-w-[1300px] mx-auto p-4 relative z-10"
    >
      <h2
        id="features-projects-title"
        className="text-[#585858] dark:text-[#585858] font-bold mb-4 md:mb-6 tracking-widest uppercase text-[32px]"
      >
        NEW FEATURES AND PROJECTS YOU MIGHT LIKE
      </h2>
      <LazyInView rootMargin="200px 0px">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense gap-4">
          {(Array.isArray(props.projects) ? props.projects : [])
            .filter((p: any) => p && p.attributes)
            .map((project: any, i: number) => {
              const w = project?.attributes?.image?.data?.attributes?.width ?? 0;
              const h = project?.attributes?.image?.data?.attributes?.height ?? 0;
              const ratio = h ? w / h : 1;
              const cmsSpan = project?.attributes?.span as 'tall' | 'wide' | 'normal' | undefined;
              let span: 'tall' | 'wide' | 'normal' = cmsSpan ?? 'normal';
              if (!cmsSpan) {
                // Legacy curated layout: first tall, second wide; otherwise derive from aspect ratio
                if (i === 0) span = 'tall';
                else if (i === 1) span = 'wide';
                else if (ratio < 0.85) span = 'tall';
                else if (ratio > 1.35) span = 'wide';
              }
              return <FeatureCard key={project.id} project={project} span={span} />;
            })}
        </div>
      </LazyInView>
    </section>
  );
}
