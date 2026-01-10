'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollAnimatorProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
}

export default function ScrollAnimator({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fade-up' 
}: ScrollAnimatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const animationClasses = {
    'fade-up': isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-8',
    'fade-in': isVisible 
      ? 'opacity-100' 
      : 'opacity-0',
    'slide-left': isVisible 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 translate-x-8',
    'slide-right': isVisible 
      ? 'opacity-100 translate-x-0' 
      : 'opacity-0 -translate-x-8',
    'scale': isVisible 
      ? 'opacity-100 scale-100' 
      : 'opacity-0 scale-95',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${animationClasses[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

