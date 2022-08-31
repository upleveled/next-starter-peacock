import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useRouter } from 'next/router';
import { Container } from '../../../components/container';
import { Layout } from '../../../components/layout';
import { INote } from '../../../components/notes/note';
import NotesComponent from '../../../components/notes/notes';
import tagsJSON from '../../../config/tags.json';
import { getContentWithTag } from '../../../lib/content';

type Props = {
  content: INote[];
  title: string;
  description: string;
};

const Category = ({ content, title, description }: Props) => {
  const { pathname } = useRouter();

  return (
    <Layout pageTitle={title} pathname={pathname} pageDescription={description}>
      <Container width="narrow">
        <p className="page-intro">{description}</p>
        <NotesComponent notes={content} basePath="notes" />
      </Container>
    </Layout>
  );
};

export const getStaticPaths = () => {
  // Get all the tags from the already defined site tags
  const paths = tagsJSON.map((tag) => {
    return {
      params: {
        tag: tag.tag,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = (
  context: GetStaticPropsContext,
): GetStaticPropsResult<Params> => {
  const { params } = context;

  if (!params?.tag) {
    return {
      props: {},
    };
  }

  const contentTag = Array.isArray(params.tag) ? params.tag[0] : params.tag;

  const content = getContentWithTag(contentTag, 'notes');
  const tagObject = tagsJSON.filter((json) => json.tag === params.tag)[0];

  return {
    props: {
      content,
      title: tagObject.title,
      description: tagObject.description,
    },
  };
};

export default Category;
