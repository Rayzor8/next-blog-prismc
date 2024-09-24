import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/ui/Bounded";
import Heading from "@/ui/Heading";
import { formatDate } from "@/utils/formateDate";
import { Content } from "@prismicio/client";


type Page = { page: Content.BlogPostDocument | Content.ProjectDocument };

export default function ContentBody({ page }: Page) {
  const formattedDate = formatDate(page.data.date);
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1" size="lg">
          {page.data.title}
        </Heading>

        <div className="flex gap-2 flex-wrap mt-6">
          {page.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs  tracking-wider text-red-800 font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-6 border-b-2 border-slate-800 text-base font-medium text-slate-300">
          {formattedDate}
        </p>

        <div className="prose prose-base prose-invert mt-10  md:mt-18 w-full max-w-none">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
