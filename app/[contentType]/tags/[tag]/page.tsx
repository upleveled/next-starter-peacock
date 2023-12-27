// TODO: I need to rethink the tags page. I don't think I want to have a page for each tag.
// /notes/tags/programming & /articles/tags/programming. Instead I want to have a single page for all tags
// /tags/programming. I think this will be easier to manage and will be more intuitive for readers.

import { Container, ContentList } from '../../../../components';
import { getContentWithTag, IContentType } from '../../../../utils/content';
import { contentTypesMap } from '../../../../utils/content-types';

/**
 * Index page `/index`
 */
export default function ContentListPage({
  params,
}: {
  params: {
    contentType: IContentType;
    tag: IContentType;
  };
}) {
  const contentType = params.contentType;
  const tag = params.tag;

  const content = getContentWithTag(tag, contentType);
  const isNotes = contentType.toLowerCase() === 'notes';
  const { title, path, description } = contentTypesMap.get(contentType);

  return (
    <Container width={isNotes ? 'narrow' : 'default'}>
      <section className="flex flex-col py-20 gap-2 max-w-2xl">
        <h1 className="text-4xl font-bold font-display">{title} Tags</h1>
        <p className="text-accent-4 text-lg">{description}</p>
      </section>
      <ContentList items={content} contentType={contentType} basePath={path} />
    </Container>
  );
}
