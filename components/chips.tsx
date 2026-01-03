import Link from 'next/link';
import type { IContentType } from '../utils/content';

export const Chips = ({
  contentType,
  items,
}: {
  contentType: IContentType;
  items: string[];
}) => {
  return (
    <ul className="list-none flex flex-wrap pl-0">
      {items.map((tag) => (
        <li
          key={`items-${tag}`}
          className="mr-2 text-sm mb-2 transition-colors list-none bg-accent-8 hover:bg-accent-7"
        >
          <Link
            href={`/${contentType}/tags/${tag}`}
            className="py-1 px-2 inline-block no-underline"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};
