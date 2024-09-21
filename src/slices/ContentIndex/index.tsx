"use client";

import useTitleAnimation from "@/hooks/useTitleAnimation";
import Bounded from "@/ui/Bounded";
import Heading from "@/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = ({ slice }: ContentIndexProps): JSX.Element => {

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
      <Heading size="lg" className="heading mb-8">
        {slice.primary.heading}
      </Heading>

      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
    </Bounded>
  );
};

export default ContentIndex;
