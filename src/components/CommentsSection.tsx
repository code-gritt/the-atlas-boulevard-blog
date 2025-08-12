"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentsSectionProps {
  blogId: string;
  isAuthenticated: boolean;
}

const CommentsSection = ({ blogId, isAuthenticated }: CommentsSectionProps) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePost = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold">Comments</h3>
      <CommentList blogId={blogId} key={refreshKey} />
      {isAuthenticated ? (
        <CommentForm blogId={blogId} onCommentPosted={handlePost} />
      ) : (
        <p className="mt-4">Login to post a comment.</p>
      )}
    </div>
  );
};

export default CommentsSection;
