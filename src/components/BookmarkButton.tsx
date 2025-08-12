"use client";

import { Bookmark } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface BookmarkButtonProps {
  blogId: string;
  initialBookmarked: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  blogId,
  initialBookmarked,
}) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const toggleBookmark = async () => {
    const res = await fetch("/api/bookmark-blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId }),
    });
    const data = await res.json();
    setBookmarked(data.bookmarked);
  };

  return (
    <Bookmark
      onClick={toggleBookmark}
      className={bookmarked ? "fill-blue-500 text-blue-500" : "text-gray-500"}
    />
  );
};

export default BookmarkButton;
