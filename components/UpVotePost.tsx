'use client'

import { upvotePost } from "@/actions/action";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { PostProps } from "./PostCard";

export default function UpVotePost({ post, userId }: { post: PostProps, userId: string }) {
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = async () => {
    if (!post) return;
    
    try {
       await upvotePost(post.id, userId);
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
      className="group flex items-center gap-1 hover:text-orange-500 transition-colors"
    >
      <ThumbsUp 
        className={isUpvoted ? 'w-4 h-4 text-blue-500 transition-transform duration-150 group-hover:scale-110 group-hover:fill-blue-500 group-hover:stroke-blue-500' : 'text-gray-400'} 
      />
      {post?.votes.length}
    </button>
  )
}