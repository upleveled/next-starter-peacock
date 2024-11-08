import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, ContentList } from '../../components';
import info from '../../config/index.json' assert { type: 'json' };
import {
  getContentList,
  getContentTypes,
  type IContentType,
} from '../../utils/content';
import { contentTypesMap } from '../../utils/content-types';
import { generateRSS } from '../../utils/rss';

type Params = Promise<{
  contentType: IContentType;
}>;

/** generate list page metadata */
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const contentType = contentTypesMap.get((await params).contentType);

  if (!contentType) {
    notFound();
  }

  return {
    title: `${contentType.title} | ${info.site.siteTitle}`,
    description: contentType.description,
  };
}

export function generateStaticParams() {
  generateRSS();

  const contentTypes = getContentTypes();
  return Array.from(contentTypes).map((contentType) => ({
    contentType,
  }));
}

/**
 * Index page `/index`
 */
export default async function ContentListPage({ params }: { params: Params }) {
  const contentType = (await params).contentType;

  // redirect to 404 with wrong contentType
  if (!contentTypesMap.has(contentType)) {
    notFound();
  }

  const content = getContentList(contentType);
  const isNotes = contentType.toLowerCase() === 'notes';
  const contentTypeData = contentTypesMap.get(contentType);

  if (!contentTypeData) {
    notFound();
  }

  const { title, description, path } = contentTypeData;

  return (
    <Container width={isNotes ? 'narrow' : 'default'}>
      <section className="flex flex-col py-20 gap-2 max-w-2xl">
        <h1 className="text-4xl font-bold font-display">{title}</h1>
        <p className="text-accent-4 text-lg">{description}</p>
      </section>

      <ContentList basePath={path} items={content} contentType={contentType} />
    </Container>
  );
}
