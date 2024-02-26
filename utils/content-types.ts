import { IContentType } from './content';

export const contentTypesMap: Map<
  IContentType,
  {
    title: string;
    description: string;
    path: string;
  }
> = new Map([
  [
    'articles',
    {
      title: 'Articles',
      description:
        "More long form articles and essays about new things I'm exploring and learning about...",
      path: 'articles',
    },
  ],
  [
    'notes',
    {
      title: 'Notes',
      description:
        "Quick and Scrappy thoughts and learning notes. Things I randomly bump into and don't want to forget.",
      path: 'notes',
    },
  ],
  [
    'works',
    {
      title: 'Selected Works',
      description:
        "Selected works I'm proud of, ranging from Software Engineering and Product Design.",
      path: 'works',
    },
  ],
]);
