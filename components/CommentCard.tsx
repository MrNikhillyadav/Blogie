"use client"

import { upVoteComment, replyToComment, replyToCommentAction } from "@/actions/action";
import { getFormattedDate } from "@/lib/utils"
import { ArrowBigDown, ArrowBigUp, MessageCircle, Send } from "lucide-react"
import { Vote } from "./PostCard";
import { useState, useTransition } from "react";

interface CommentProps {
  id: number,
  content: string,
  postId: number,
  upVotes: number,
  parentId: number | null,
  downVotes: number,
  repliesCount: number,
  createdAt: Date,
  user: User,
  children?: CommentProps[];
  votes: Vote[]
}

interface User {
  id: string,
  name: string | null,
  email: string | null
}

export default function CommentCard({ comment,postId }: { comment: CommentProps, postId : number }) {
  const [isCommentInputOpen, setIsCommentInputOpen] = useState(false);
  const [isPending, startTransition] = useTransition();


  return (
    <div className="text-zinc-700 border border-zinc-300 bg-zinc-100 rounded-md mt-2 p-2">
      <p className="text-[16px] font-semibold text-zinc-700">{comment.user.name}</p>
      <p className="text-[10px] text-zinc-600">{getFormattedDate(comment.createdAt)}</p>
      
      <p className="text-sm">{comment.content}</p>
      
      <div className="flex mt-2 items-center justify-start gap-2">
        <p className="group flex text-xs text-zinc-600 items-center justify-start gap-1 cursor-pointer">
          <ArrowBigUp  
            onClick={() => upVoteComment(comment.id)}
            className="w-3 h-3 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500"
          />
          {comment.upVotes}
        </p>
        <p className="group flex text-xs text-zinc-600 items-center justify-start gap-1">
          <ArrowBigDown className="w-4 h-3 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500" />
          {comment.downVotes}
        </p>
        <p className="group flex text-xs text-zinc-600 items-center justify-start gap-1">
          <MessageCircle className="w-3 h-3 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500" />
          {comment.repliesCount || comment.children?.length || 0}
        </p>
        <button 
          onClick={() => setIsCommentInputOpen(!isCommentInputOpen)}
          className="text-xs text-zinc-600 cursor-pointer hover:text-orange-600 transition-all duration-150 px-1"
          disabled={isPending}
        >
          reply
        </button>
      </div>

      {/* Reply Form - shows when reply button clicked */}
      {isCommentInputOpen && (
        <form action={replyToCommentAction} className="mt-3 p-2 border border-zinc-400 bg-zinc-100 text-xs rounded-md">
          <input 
            name="content"
            className="w-full p-2 border border-zinc-300 rounded-md text-sm outline-none focus:border-orange-600"
            type="text" 
            placeholder="Write a reply..."
            disabled={isPending}
          />
          <div className="flex items-center gap-2 mt-2">
            <button 
              type="submit" 
              disabled={isPending}
              className="flex items-center gap-1 bg-orange-600 text-white px-3 py-1 rounded-md text-xs hover:bg-orange-600 disabled:opacity-50 transition-all duration-150"
            >
              <Send className="w-3 h-3" />
              {isPending ? "Replying..." : "Reply"}
            </button>
            <button 
              type="button"
              onClick={() => setIsCommentInputOpen(false)}
              className="px-3 py-1 text-xs text-zinc-500 hover:text-zinc-700 rounded-md"
              disabled={isPending}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Nested replies */}
      {comment.children && comment.children.length > 0 && (
        <div className="mt-3 mx-2 space-y-2 pl-4 border-l border-zinc-300">
          {comment.children.map((child) => (
            <CommentCard key={child.id} comment={child} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}
