import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Chips, Container } from '../../../components';
import BackButton from '../../../components/back-button';
import info from '../../../config/index.json' assert { type: 'json' };
import {
  getContentData,
  getContentList,
  getContentTypes,
  type IContentData,
  type IContentType,
} from '../../../utils/content';
import { contentTypesMap } from '../../../utils/content-types';
import Content from './content';

type Params = {
  params: Promise<{ slug: string; contentType: IContentType }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, contentType } = await params;
  const { title, previewImage, description } = await getContentData(
    slug,
    contentType,
  );
  return {
    title: `${title} | ${info.site.siteTitle}`,
    description: description ?? info.site.siteDescription,
    openGraph: {
      title: `${title} | ${info.site.siteName}`,
      description: description ?? info.site.siteDescription,
      url: info.site.siteUrl,
      images: previewImage ?? info.site.siteImage,
      siteName: info.site.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      creator: info.author.twitterHandle,
      images: previewImage ?? info.site.siteImage,
    },
  };
}

/**
 * statically generate all content pages
 */
export function generateStaticParams() {
  const contentTypes = getContentTypes();

  return contentTypes.flatMap((contentType) => {
    const contentList = getContentList(contentType);
    return contentList.map(({ slug }) => {
      return {
        contentType,
        slug,
      };
    });
  });
}

/**
 *  Renders articles markdown posts
 */

async function fetchContentData(slug: string, contentType: IContentType) {
  return await getContentData(slug, contentType);
}

export default async function ContentPage({ params }: Params) {
  const { slug, contentType } = await params;

  if (!contentTypesMap.has(contentType)) {
    notFound();
  }

  const content = await fetchContentData(slug, contentType);
  if (content.draft) notFound();

  if (contentType === 'works') return <WorkPage work={content} />;

  return (
    <Container width="narrow">
      <header>
        <section className="pt-16">
          <h1 className="my-0 font-bold font-display mb-2 text-2xl/normal md:text-4xl max-w-xl">
            {content.title}
          </h1>
          <time className="block text-accent-4 mb-8">
            {content.date.toString()}
          </time>
          {!!content.previewImage && (
            <Image
              className="pb-8 block object-cover"
              src={content.previewImage}
              height={550}
              width={1200}
              alt=""
            />
          )}
        </section>
      </header>

      <Content html={content.contentHtml} />
      {content.tags && <Chips items={content.tags} />}
    </Container>
  );
}

function WorkPage({ work }: { work: IContentData }) {
  return (
    <Container className="flex flex-col lg:flex-row gap-4 pt-12">
      <section className="w-full lg:w-1/3 border-r border-accent-8 p-2 pr-8">
        <div className="mb-8 flex flex-col items-start gap-5">
          <BackButton />
          <h1 className="text-4xl font-bold font-display text-accent-3">
            {work.title}
          </h1>
          <p className="text-accent-4">{work.description}</p>
          <button>Se Demo</button>
        </div>

        <ul>
          <TechStack techStack={work.techStack ?? []} />
          <MetadataListItem item="Date" value={work.date.toString()} />
          {Boolean(work.problem) && (
            <MetadataListItem item="Problem" value={work.problem ?? ''} />
          )}
        </ul>
      </section>

      <section className="w-full lg:w-2/3 p-2">
        <Image
          src={work.previewImage ?? ''}
          height={1000}
          width={1000}
          alt=""
          className="mb-4"
        />
        <Content html={work.contentHtml} />
      </section>
    </Container>
  );
}

function MetadataListItem({ item, value }: { item: string; value: string }) {
  return (
    <li className="list-none flex gap-4 border-b border-accent-8 py-3 text-sm">
      <span className="text-accent-4 w-1/3">{item}</span>
      <span className="w-2/3 text-accent-2">{value}</span>
    </li>
  );
}

function TechStack({ techStack }: { techStack: string[] }) {
  if (!techStack.length) return null;
  return (
    <li className="list-none flex gap-4 border-b border-accent-8 py-3 text-sm">
      <span className="text-accent-4 w-1/3 flex-shrink-0">Tech Stack</span>

      <ul className="flex flex-wrap gap-2 flex-grow-0">
        {techStack.map((tech) => (
          <li
            key={`techStack-${tech}`}
            className="select-none bg-accent-8 text-accent-2 px-2 py-1 rounded-md"
          >
            {tech}
          </li>
        ))}
      </ul>
    </li>
  );
}
