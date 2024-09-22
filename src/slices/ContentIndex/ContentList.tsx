"use client";

import { Content } from "@prismicio/client";
import { gsap } from "gsap";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  viewMoreText?: Content.ContentIndexSlice["primary"]["view_more_text"];
};

export default function ContentList({
  items,
  contentType,
  viewMoreText = "Read More",
}: ContentListProps) {
  const component = useRef(null);
  const urlPrefix = contentType === "Blog" ? "/blog" : "/project";

  useEffect(() => {
    const cxt = gsap.context(() => {
      gsap.fromTo(
        component.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, ease: "power3.inOut", duration: 0.8, stagger: 0.1 }
      );
    }, component);
    return () => cxt.revert();
  }, []);

  return (
    <ul className="grid border-b border-slate-100" ref={component}>
      {items.map((item, index) => (
        <li key={index}>
          <Link
            href={urlPrefix + "/" + item.uid}
            className="flex flex-col justify-between md:items-center text-slate-200 border-t border-slate-100 py-4 md:py-6 px-2 md:flex-row hover:bg-slate-800 transition-colors gap-4 md:gap-0"
            aria-label={item.data.title ?? "View More"}
          >
            <div className="space-y-4">
              <span className="text-lg">{item.data.title}</span>
              <div className="space-x-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs  tracking-wider text-red-800 font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm md:text-base font-medium flex-shrink-0">
              {viewMoreText} <MdArrowOutward />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
