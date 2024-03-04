import { Metadata } from 'next';
import { Container, Header, Testimonials, WorkItem } from '../components';
import info from '../config/index.json' assert { type: 'json' };
import testimonials from '../config/testimonials.json' assert { type: 'json' };
import { getContentList } from '../utils/content';

/**
 * Index page `/index`
 */

export const metadata: Metadata = {
  title: info.site.siteTitle,
  keywords: info.site.keywords.split(','),
  description: info.site.siteDescription,
  alternates: {
    types: {
      'application/rss+xml': [
        {
          title: info.site.siteName,
          url: `${info.site.siteUrl}rss.xml`,
        },
      ],
    },
  },
  twitter: {
    card: 'summary_large_image',
    creator: info.author.twitterHandle,
    images: info.site.siteImage,
  },
  openGraph: {
    title: `${info.site.siteTitle} | ${info.site.siteDescription}`,
    description: info.site.siteDescription,
    url: info.site.siteUrl,
    images: info.site.siteImage,
    siteName: info.site.siteName,
  },
};

const Index = () => {
  const content = getContentList('works').filter((work) => work.selectedWork);

  return (
    <div>
      <Header />
      <Container className="flex flex-col gap-8 mb-20 border-b border-accent-8 pb-9">
        {content.map((work) => (
          <WorkItem key={`work-${work.slug}`} work={work} />
        ))}
      </Container>
      <Testimonials testimonials={testimonials} />
    </div>
  );
};

export default Index;
