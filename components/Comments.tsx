import { PostProps } from "./PostCard";
import  prisma from "@/lib/prisma"
import CommentCard from "./CommentCard";


async function getPostComments(id: number){
  const comments = await prisma.comment.findMany({
     where: {
       postId: id,
       parentId: null,              // only top-level comments
     },
     include: {
       user: {
         select: { id: true, name: true, email: true },
       },
       children: {
         include: {
           user: {
             select: { id: true, name: true, email: true },
           },
         },
         orderBy: { createdAt: "asc" },
       },
     },
     orderBy: { createdAt: "asc" },
   });
    
  return comments ;
} 

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
      <h2 className="border-b border-zinc-400">{comments.length} Comments</h2>
      {comments.map((comment) =>(
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}