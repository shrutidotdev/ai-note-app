"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { forwardRef } from "react";

const CreateNoteBtn = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ children, ...props }, ref) => {
    return (
      <Button ref={ref} {...props} className="cursor-pointer">
        <Plus className="h-4 w-4 mr-2" />
        {children ?? "Create Note"}
      </Button>
    );
  }
);

CreateNoteBtn.displayName = "CreateNoteBtn";

export default CreateNoteBtn;
