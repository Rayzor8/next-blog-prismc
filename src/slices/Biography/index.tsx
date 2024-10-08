"use client";

import Bounded from "@/ui/Bounded";
import Button from "@/ui/Button";
import Heading from "@/ui/Heading";
import { Content } from "@prismicio/client";

import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Avatar from "./Avatar";
import useTitleAnimation from "@/hooks/useTitleAnimation";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
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
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={elementRef}
    >
      <div className=" grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading as="h1" size="lg" className="heading col-start-1">
          {slice.primary.heading}
        </Heading>

        <div className="prose prose-xl prose-slate prose-invert col-start-1">
          <PrismicRichText field={slice.primary.description} />
        </div>

        <Button
          linkField={slice.primary.button_link}
          label={slice.primary.button_text}
        />

        <Avatar
          image={slice.primary.avatar}
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3 mx-auto"
        />
      </div>
    </Bounded>
  );
};

export default Biography;
