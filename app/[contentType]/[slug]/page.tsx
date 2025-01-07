import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { Chips, Container } from '../../../components';
import BackButton from '../../../components/back-button';
import type { IContentData, IContentType } from '../../../utils/content';
import Content from './content';

type Params = {
  params: Promise<{ slug: string; contentType: IContentType }>;
};

export default async function ContentPage({ params }: Params) {
  const { slug, contentType } = await params;

  const contentTypes = ['articles', 'notes', 'works'];
  if (!contentTypes.includes(contentType)) {
    notFound();
  }

  const filePath = path.join(
    path.join(process.cwd(), 'content'),
    contentType,
    `${slug}.md`,
  );
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  if (data.draft) {
    notFound();
  }

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  const contentHtml = processedContent.toString();

  if (contentType === 'works') {
    return (
      <WorkPage
        work={{
          ...data,
          contentHtml,
          id: data.id,
          date: data.date,
          title: data.title,
        }}
      />
    );
  }

  return (
    <Container width="narrow">
      <header>
        <section className="pt-16">
          <h1 className="my-0 font-bold font-display mb-2 text-2xl/normal md:text-4xl max-w-xl">
            {data.title}
          </h1>
          <time className="block text-accent-4 mb-8">{data.date}</time>
          {!!data.previewImage && (
            <Image
              className="pb-8 block object-cover"
              src={data.previewImage}
              height={550}
              width={1200}
              alt=""
            />
          )}
        </section>
      </header>

      <Content html={contentHtml} />
      {data.tags && <Chips items={data.tags} />}
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
          {work.problem && (
            <MetadataListItem item="Problem" value={work.problem} />
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
