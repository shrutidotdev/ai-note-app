"use client";

import { Separator } from '@/components/ui/separator';
import CreateNoteForm from '../components/CreateNoteForm';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import NoteCard from '../components/NoteCard';

const NotesPage = () => {
  const notes = useQuery(api.notes.getNotesByUser);

  if (notes === undefined) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <div className="text-center">
          <div className="text-xl font-semibold">Loading notes...</div>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8'>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center">
          No notes yet! Try creating first👆
        </h1>
      </div>
    );
  }

  return (
    <main className='min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='py-6 space-y-6'>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center">
            My Notes 📒
          </h1>
          <Separator />
        </div>

        {/* Create Note Button */}
        <div className='py-5'>
          <CreateNoteForm />
        </div>

        {/* Notes Masonry Grid */}
        <section className='pb-8'>
          <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6'>
            {notes.map(({ _id, title, content }) => (
              <div key={_id} className='break-inside-avoid mb-4 md:mb-6'>
                <NoteCard id={_id} title={title} content={content} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default NotesPage;