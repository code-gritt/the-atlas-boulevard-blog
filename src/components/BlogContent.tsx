"use client";

import { EditorContent, useEditor, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function BlogContent({ content }: { content: Content }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) {
    return <div>Loading content...</div>;
  }

  return <EditorContent editor={editor} className="prose max-w-none" />;
}
