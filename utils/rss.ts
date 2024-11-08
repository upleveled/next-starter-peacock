import fs from 'node:fs';
import path from 'node:path';
import { Feed } from 'feed';
import info from '../config/index.json' assert { type: 'json' };
import { getContentList, type IContent, sortByDate } from './content';

const { siteName, siteTitle, siteUrl } = info.site;

export const notesContent = getContentList('notes');
export const articlesContent = getContentList('articles');

export function generateRSS() {
  const year = new Date().getFullYear();
  try {
    console.log('🔃 - Generating RSS feed at rss.xml');
    const feed = new Feed({
      title: siteName,
      description: siteTitle,
      id: siteUrl,
      link: siteUrl,
      favicon: `${siteUrl}/favicon.ico`,
      feedLinks: {
        rss: `${siteUrl}/rss.xml`,
      },
      image: `${siteUrl}/Logo.png`,
      copyright: `${year} ${info.author.name}`,
      language: 'en',
      author: {
        name: info.author.name,
        link: info.author.twitterHandle,
      },
    });

    articlesContent.sort(sortByDate).forEach((contentItem: IContent) => {
      const { title, previewImage, date, slug, description } = contentItem;

      const url = `${siteUrl}/articles/${slug}`;
      feed.addItem({
        title,
        id: slug,
        description,
        image: path.join(siteUrl, previewImage!),
        author: [
          {
            name: info.author.name,
            link: info.author.twitterHandle,
          },
        ],
        date: new Date(date),
        link: url,
      });
    });

    const xml = feed.rss2();
    fs.writeFileSync('./public/rss.xml', xml);
    console.log('🎉 - RSS feed generated at rss.xml');
  } catch (ex) {
    console.error(
      ex,
      // `😢 An error occurred while generating XML scripts: ${ex.message}`
    );
  }
}
