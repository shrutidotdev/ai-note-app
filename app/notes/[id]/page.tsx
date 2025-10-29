"use client";

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import { title } from 'process';
import React from 'react'

const EachNote = () => {
    const param = useParams();
    const router = useRouter();

    const notes = useQuery(api.notes.getNoteById, { 
        id: param.id as Id<"notes">
    });

    if(notes === undefined) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading note...</div>
            </div>
            )
    }

    if (notes === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Note not found</h1>
                <Button onClick={() => router.push("/")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to notes
                </Button>
            </div>
        );
    }
  return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <Button 
                variant="ghost" 
                className="mb-6"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            
            <article className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-4">{notes.title}</h1>
                <div className="text-sm text-gray-500 mb-6">
                    Created: {new Date(notes.createdAt).toLocaleDateString()}
                </div>
                <div className="whitespace-pre-wrap text-gray-70s0">
                    {notes.content}
                </div>
            </article>
        </div>
    );
}

export default EachNote
