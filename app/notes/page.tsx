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
    <div className='min-h-screen w-full'>
      {/* Header Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center">
          My Notes 📒
        </h1>
        <Separator />
      </div>

       {/* Create Note Form */}
        <main>
          <CreateNoteForm />
        </main>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8'>
        {/* Notes Grid */}
        <section className='mb-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
            {notes.map(({ title, content }, index) => (
              <div key={`${title}-${index}`}>
                <NoteCard title={title} content={content} />
              </div>
            ))}
          </div>
        </section>

       
      </div>
    </div>
  );
}

export default NotesPage;