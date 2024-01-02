import React from 'react';
import { IContent } from '../../utils/content';
import { Note } from './note';

interface INotes {
  notes: IContent[];
  basePath: string;
}

export function Notes({ notes, basePath }: INotes) {
  return (
    <section>
      {notes.map((note) => (
        <Note
          id={note.id}
          key={`note-${note.slug}`}
          basePath={basePath}
          title={note.title}
          slug={note.slug}
          date={note.date}
        />
      ))}
    </section>
  );
}

export default Notes;
