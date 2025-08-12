"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LikeButtonProps {
  blogId: string;
  initialLiked: boolean;
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  blogId,
  initialLiked,
  initialLikes,
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const toggleLike = async () => {
    const res = await fetch("/api/like-blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId }),
    });
    const data = await res.json();
    setIsLiked(data.liked);
    setLikeCount(data.liked ? likeCount + 1 : likeCount - 1);
  };

  return (
    <>
      <Heart
        onClick={toggleLike}
        className={isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}
      />
      <span>{likeCount}</span>
    </>
  );
};

export default LikeButton;
