'use client'

import { upvotePost } from "@/actions/action";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { PostProps } from "@/app/(main)/blog/PostCard";

export default function UpVotePost({ post}: { post: PostProps }) {
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = async () => {
    if (!post) return;
    
    try {
       await upvotePost(post.id);
      setIsUpvoted(true);
    }
    catch (error) {
      console.error('Error upvoting post:', error);
      setIsUpvoted(false);
    }
  };

  return (
    <button 
      type="button"
      onClick={handleUpvote}
      className="group flex items-center gap-1  "
    >
      <ThumbsUp 
      className={isUpvoted ? 'w-3 h-3 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500' : 'w-4 h-4 text-zinc-500'} />
      {post?.votes.length}
    </button>
  )
}