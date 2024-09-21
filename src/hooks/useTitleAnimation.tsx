import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface AnimationProps {
  selector: string;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  duration: number;
  stagger?: gsap.TweenVars['stagger'];
}

const useTitleAnimation = ({ selector, from, to, duration, stagger }: AnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline.fromTo(
        selector,
        from,
        {
          ...to,
          ease: "bounce.out",
          duration,
          stagger
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [selector, from, to, duration, stagger]);

  return elementRef;
};

export default useTitleAnimation;