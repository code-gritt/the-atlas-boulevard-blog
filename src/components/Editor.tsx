"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";

export const EditorComponent = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your story...",
      }),
    ],
    content: "",
    immediatelyRender: false, // Prevent SSR hydration mismatch
  });

  return (
    <>
      <EditorContent editor={editor} className="prose max-w-none mb-4" />
      <input
        type="hidden"
        name="content"
        value={JSON.stringify(editor?.getJSON() || {})}
      />
    </>
  );
};
