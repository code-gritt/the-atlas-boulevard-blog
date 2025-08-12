"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

interface CommentFormProps {
  blogId: string;
  onCommentPosted: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  blogId,
  onCommentPosted,
}) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postComment = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/comment-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, content }),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      setContent("");
      onCommentPosted();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        className="mb-4"
        disabled={loading}
      />
      <Button onClick={postComment} disabled={loading || !content.trim()}>
        {loading ? "Posting..." : "Post Comment"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CommentForm;
