import { PostProps } from "./PostCard";
import CommentCard from "./CommentCard";
import { getPostComments } from "@/actions/action";



export default async function PostComments({post}:{post : PostProps }){
  
  if(!post){
    return <div className="text-zinc-700"> No comments yet </div>
  }
  
  const comments = await getPostComments(post.id);
  if(comments.length === 0){
    return <div className="text-zinc-700"> No comments yet </div>
  }
  
  return (
    <div className="text-zinc-700">
      <h2 className="border-b border-zinc-400">{comments.length +1} Comments</h2>
      {comments && comments.map((comment) =>(
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}