"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import CreateNoteBtn from "./CreateNoteBtn";

const CreateNoteSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    content: z.string().min(1, "Content is required"),
})
type CreateNoteFormValues = z.infer<typeof CreateNoteSchema>;

const CreateNoteForm = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const createNoteMutation = useMutation(api.notes.createNote);

    const form = useForm<CreateNoteFormValues>({
        resolver: zodResolver(CreateNoteSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    })

    async function onSubmit(value: CreateNoteFormValues) {
        console.log("submitting", value)

        try {
            setLoading(true);
            await createNoteMutation(value);
            toast.success("Note created successfully");
            form.reset();
            setOpen(false);
        } catch (error) {
            console.log("Error creating note:", error);
            toast.error("Failed to create note");
        } finally {
            setLoading(false);
        }
    }

    return (
     
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <CreateNoteBtn />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a new note</DialogTitle>
                    <DialogDescription>
                        Fill in the details below. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter note title"
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter note content"
                                            {...field}
                                            disabled={loading}
                                            rows={5}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && (
                            <div className="text-sm text-destructive text-center">
                                {error}
                            </div>
                        )}
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button" disabled={loading}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default CreateNoteForm
