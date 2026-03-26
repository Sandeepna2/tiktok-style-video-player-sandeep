import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to observe whether a DOM element is intersecting the viewport.
 * @param {number} threshold - 0 to 1, how much of the element must be visible.
 * @returns {Array} - [ref, isIntersecting]
 */
export const useIntersectionObserver = (threshold = 0.7) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]); // threshold is a primitive — safe dep

  return [ref, isIntersecting];
};
