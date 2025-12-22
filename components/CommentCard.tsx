import { getFormattedDate } from "@/lib/utils"
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react"


interface CommentProps {
  id : number,
  content : string,
  postId : number,
  upVotes : number,
  parentId : number | null,
  downVotes : number,
  repliesCount : number,
  createdAt : Date,
  user : User,
  children?: CommentProps[]; // recursive type for nested replies
}

interface User {
  id : string,
  name : string | null,
  email : string | null
}

export default function CommentCard({comment}:{comment:CommentProps}){
  return (
    <div className="text-zinc-700 border border-zinc-300 bg-zinc-100 rounded-md mt-2 p-2">
      <p className="text-[16px] font-semibold text-zinc-700" >{comment.user.name}</p>
      <p className="text-[10px] text-zinc-600 ">{getFormattedDate(comment.createdAt)}</p>
      <p className="text-sm" >{comment.content}</p>
      
      <div className="flex mt-2 items-center justify-start gap-2">
        <p className="flex text-xs text-zinc-600 items-center justify-start gap-1">
          <ThumbsUp className="w-3 h-3 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500"/>
          {comment.upVotes}
        </p>
        <p className="flex text-xs text-zinc-600 items-center justify-start gap-1">
          <ThumbsDown className="w-3 h-3 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500"/>
        {comment.downVotes}
        </p>
        <p className="flex text-xs text-zinc-600 items-center justify-start gap-1">
          <MessageCircle className="w-3 h-3 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500"/>
          {comment.repliesCount}
        </p>
        <p className="flex text-xs text-zinc-600">
          reply
        </p>
        
      </div>
        {/* Nested replies */}
        {comment.children && comment.children.length > 0 && (
          <div className="mt-3 mx-2 space-y-2 pl-4 border-l border-zinc-300">
            {comment.children.map((child) => (
              <CommentCard key={child.id} comment={child} />
            ))}
          </div>
        )}
    </div>
  )
}