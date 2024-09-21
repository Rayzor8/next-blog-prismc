"use client";

import useTitleAnimation from "@/hooks/useTitleAnimation";
import React from "react";
import Heading from "@/ui/Heading";

type TitleProps = {
  children: React.ReactNode;
};

export default function TitleAnimation({ children }: TitleProps) {
  const elementRef = useTitleAnimation({
    selector: ".heading",
    from: {
      x: -100,
      opacity: 0,
      rotate: -10,
    },
    to: {
      x: 0,
      opacity: 1,
      rotate: 0,
    },
    duration: 0.8,
    stagger: 0.1,
  });
  return (
    <div ref={elementRef}>
      <Heading size="lg" className="heading mb-8">
        {children}
      </Heading>
    </div>
  );
}
