"use client";

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner';
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
import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';


const EachNote = () => {
    const param = useParams();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);


    const notes = useQuery(api.notes.getNoteById, {
        id: param.id as Id<"notes">
    });

    const deleteNote = useMutation(api.notes.deleteNoteById);
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteNote({ id: param.id as Id<"notes"> });
            router.push("/notes");
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Failed to delete note");
            setIsDeleting(false);
        }
    }

    if (notes === undefined) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading note...</div>
            </div>
        )
    }

    if (notes === null) {
        return notFound();
    }
    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <section className='flex justify-between '>
                <Button
                    variant="ghost"
                    className="mb-6"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

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
                                This action cannot be undone. This will permanently delete your note. Titled<span className="font-semibold"> &quot;{notes.title}&quot;</span>.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className='bg-red-500 text-white hover:bg-red-600 focus:ring-red-600 cursor-pointer'
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </section>

            <Separator />

            <article className="prose prose-lg max-w-none mt-20">
                <div className=" flex justify-between items-center">
                    <h1 className="text-4xl font-bold mb-4 text-left">{notes.title}</h1>
                    <p className='text-sm text-gray-500 mb-6'>Created: {new Date(notes.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="whitespace-pre-wrap text-white">
                    {notes.content}
                </div>
            </article>
        </div>
    );
}

export default EachNote
