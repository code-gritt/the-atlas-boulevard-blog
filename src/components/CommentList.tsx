"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: { name: string; avatar: string };
}

interface CommentListProps {
  blogId: string;
}

const CommentList: React.FC<CommentListProps> = ({ blogId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const res = await fetch(`/api/get-comments?blogId=${blogId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">{comment.user.name}</span>
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
      {comments.length === 0 && <p>No comments yet.</p>}
    </div>
  );
};

export default CommentList;
