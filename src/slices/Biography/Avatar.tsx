"use client";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type AvatarProps = {
  image: ImageField;
  className?: string;
};

export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.inOut" }
      );

    }, component);
    return () => ctx.revert();
  }, []);
  return (
    <div className={clsx("relative w-full h-full", className)} ref={component}>
      <div className="avatar aspect-square overflow-hidden rounded-full border-4 border-slate-700 opacity-0 shadow-2xl">
        <PrismicNextImage
          field={image}
          className="avatar-image object-fill w-full h-full"
          imgixParams={{ q: 90 }}
          alt=""
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block" />
      </div>
    </div>
  );
}
