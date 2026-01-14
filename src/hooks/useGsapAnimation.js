import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIntersectionObserver } from './useIntersectionObserver';

/**
 * Custom hook untuk GSAP animations dengan intersection observer
 * Animasi berjalan ketika element masuk viewport
 */
export const useGsapAnimation = (animationType = 'fadeInUp', options = {}) => {
  const [elementRef, isVisible] = useIntersectionObserver();
  const animationRef = useRef(null);

  const defaultOptions = {
    duration: 0.8,
    delay: 0,
    ease: 'power2.out',
    ...options
  };

  useEffect(() => {
    if (!elementRef.current || !isVisible) return;

    // Prevent multiple animations
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const element = elementRef.current;

    // Set initial state based on animation type
    switch (animationType) {
      case 'fadeInUp':
        gsap.set(element, { opacity: 0, y: 40 });
        animationRef.current = gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: defaultOptions.duration,
          delay: defaultOptions.delay,
          ease: defaultOptions.ease,
        });
        break;

      case 'fadeInDown':
        gsap.set(element, { opacity: 0, y: -40 });
        animationRef.current = gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: defaultOptions.duration,
          delay: defaultOptions.delay,
          ease: defaultOptions.ease,
        });
        break;

      case 'fadeInLeft':
        gsap.set(element, { opacity: 0, x: -40 });
        animationRef.current = gsap.to(element, {
          opacity: 1,
          x: 0,
          duration: defaultOptions.duration,
          delay: defaultOptions.delay,
          ease: defaultOptions.ease,
        });
        break;

      case 'fadeInRight':
        gsap.set(element, { opacity: 0, x: 40 });
        animationRef.current = gsap.to(element, {
          opacity: 1,
          x: 0,
          duration: defaultOptions.duration,
          delay: defaultOptions.delay,
          ease: defaultOptions.ease,
        });
        break;

      case 'scaleIn':
        gsap.set(element, { opacity: 0, scale: 0.8 });
        animationRef.current = gsap.to(element, {
          opacity: 1,
          scale: 1,
          duration: defaultOptions.duration,
          delay: defaultOptions.delay,
          ease: defaultOptions.ease,
        });
        break;

      case 'slideInUp':
        gsap.set(element, { opacity: 0, y: 60 });
        animationRef.current = gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: defaultOptions.duration,
          delay: defaultOptions.delay,
          ease: defaultOptions.ease,
        });
        break;

      case 'staggerChildren':
        // Untuk stagger animasi child elements
        const children = element.children;
        gsap.set(children, { opacity: 0, y: 30 });
        animationRef.current = gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: defaultOptions.duration,
          delay: defaultOptions.delay,
          stagger: 0.1,
          ease: defaultOptions.ease,
        });
        break;

      default:
        gsap.set(element, { opacity: 0 });
        animationRef.current = gsap.to(element, {
          opacity: 1,
          duration: defaultOptions.duration,
          delay: defaultOptions.delay,
          ease: defaultOptions.ease,
        });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [elementRef, isVisible, animationType, defaultOptions]);

  return elementRef;
};

/**
 * Hook untuk stagger animasi pada list items
 */
export const useGsapStagger = (itemSelector = '.item', options = {}) => {
  const containerRef = useRef(null);
  const [elementRef, isVisible] = useIntersectionObserver();
  const animationRef = useRef(null);

  const defaultOptions = {
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    ...options
  };

  useEffect(() => {
    if (!containerRef.current || !isVisible) return;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    const items = containerRef.current.querySelectorAll(itemSelector);
    
    gsap.set(items, { opacity: 0, y: 30 });
    animationRef.current = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: defaultOptions.duration,
      stagger: defaultOptions.stagger,
      ease: defaultOptions.ease,
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [elementRef, isVisible, itemSelector, defaultOptions]);

  // Assign elementRef to containerRef
  useEffect(() => {
    if (elementRef?.current) {
      containerRef.current = elementRef.current;
    }
  }, [elementRef]);

  return elementRef;
};

/**
 * Hook untuk hover animations dengan GSAP
 */
export const useGsapHover = (hoveredState = {}, initialState = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        duration: 0.3,
        ease: 'power2.out',
        ...hoveredState,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        duration: 0.3,
        ease: 'power2.out',
        ...initialState,
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoveredState, initialState]);

  return elementRef;
};
