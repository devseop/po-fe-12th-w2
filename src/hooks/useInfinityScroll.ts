import { useEffect, useRef } from 'react';

const useInfinityScroll = (
  loadMoreIssues: () => void,
): React.MutableRefObject<HTMLDivElement | null> => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMoreIssues();
      }
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, loadMoreIssues]);

  return containerRef;
};

export default useInfinityScroll;
