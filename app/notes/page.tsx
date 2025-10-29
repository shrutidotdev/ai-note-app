"use client";

import { Separator } from '@/components/ui/separator';
import CreateNoteForm from '../components/CreateNoteForm';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import NoteCard from '../components/NoteCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import Link from 'next/link';
import CreateNoteBtn from '../components/CreateNoteBtn';

const NotesPage = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deleteNotes = useMutation(api.notes.deleteAllNotes);

  const handleDeleteAll = async () => {
    try {
      setIsDeleting(true);
      await deleteNotes();
      toast.success("All notes deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Error deleting all notes:", error);
      toast.error("Failed to delete notes");
    } finally {
      setIsDeleting(false);
    }
  }

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
      <section className='p-5'>
        <CreateNoteForm />
        <div className='min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8'>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center">
            No notes yet! Try creating one first👆
          </h1>
        </div>
      </section>

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

        <section className="flex items-center justify-between mb-6">
          {/* Create Note Button */}
          <div className='py-5'>
            <CreateNoteForm />
          </div>

          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button

                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your note.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAll}
                    disabled={isDeleting}
                    className='bg-red-500 text-white hover:bg-red-600 focus:ring-red-600 cursor-pointer'
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>

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