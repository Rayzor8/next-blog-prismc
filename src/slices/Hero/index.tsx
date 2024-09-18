"use client";

import { useRef, useEffect } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/ui/Bounded";
import PlanetShape from "./PlanetShape";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline.fromTo(
        ".name-animation",
        { x: -100, opacity: 0, rotate: -10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "bounce.out",
          duration: 0.8,
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );

      timeline.fromTo(
        ".job-animation",
        {
          x: 50,
          opacity: 0,
          rotate: 10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "bounce.out",
          duration: 0.8,
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key}-index inline-block opacity-0 `}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <PlanetShape />
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-6 text-[clamp(3rem,16vmin,7rem)] font-extrabold leading-none tracking-wide"
            aria-label={`${slice.primary.first_name}${slice.primary.last_name}`}
          >
            <span className="block text-slate-200">
              {renderLetters(slice.primary.first_name, "first")}
            </span>

            <span className="block text-theme">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="job-animation block gradient-theme bg-clip-text font-bold tracking-widest text-transparent opacity-0 text-3xl lg:text-4xl">
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
