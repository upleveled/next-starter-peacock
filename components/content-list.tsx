import { HTMLAttributes } from 'react';
import { IContent, IContentType } from '../utils/content';
import { Cards, WorkItem } from './';

interface ContentListProps extends HTMLAttributes<HTMLElement> {
  items: IContent[];
  contentType: IContentType;
  basePath: string;
}

export function ContentList({
  items,
  contentType,
  basePath,
}: ContentListProps) {
  if (contentType === 'works') {
    const otherWorks = items.filter((x) => !x.selectedWork);
    return (
      <section>
        <section className="flex flex-col gap-8 pb-10 mb-10 border-b border-accent-8">
          {items
            .filter((x) => x.selectedWork)
            .map((item) => (
              <WorkItem key={`item-${item.slug}`} work={item} />
            ))}
        </section>

        {otherWorks.length > 0 && (
          <>
            <h3 className="text-3xl font-bold text-accent-3 mb-16 font-display">
              Other Experiments
            </h3>
            <section className="flex gap-8">
              <WorkListGrid works={otherWorks} />
            </section>
          </>
        )}
      </section>
    );
  }

  return <Cards items={items} basePath={basePath} />;
}

function WorkListGrid({ works }: { works: IContent[] }) {
  return (
    <section className="flex flex-col lg:flex-row flex-wrap gap-8 pb-10 mb-10 w-full">
      {works.map((item) => (
        <WorkItem key={`item-${item.slug}`} work={item} grid />
      ))}
    </section>
  );
}
