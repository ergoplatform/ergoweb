import React, { useEffect, useRef, useState, ReactNode } from 'react';

type LazyInViewProps = {
  children: ReactNode | (() => ReactNode);
  rootMargin?: string;
  threshold?: number | number[];
  className?: string;
  placeholder?: ReactNode;
  once?: boolean; // if true, mount once and keep it visible thereafter
};

const LazyInView: React.FC<LazyInViewProps> = ({
  children,
  rootMargin = '0px 0px 0px 0px',
  threshold = 0,
  className,
  placeholder = null,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | null = null;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              if (once && observer) {
                observer.unobserve(entry.target);
                observer.disconnect();
              }
            } else if (!once) {
              setVisible(false);
            }
          });
        },
        {
          rootMargin,
          threshold,
        },
      );
      observer.observe(el);
    } else {
      // Fallback: mount immediately on older browsers
      setVisible(true);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [rootMargin, threshold, once]);

  const content = typeof children === 'function' ? (children as () => ReactNode)() : children;

  return (
    <div ref={ref} className={className}>
      {visible ? content : placeholder}
    </div>
  );
};

export default LazyInView;
