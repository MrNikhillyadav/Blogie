import { PostProps } from "./PostCard";
import CommentCard from "./CommentCard";
import { getPostComments, getUser, commentOnPost } from "@/actions/action";
import { CircleUser, Send } from "lucide-react"; 

export default async function PostComments({ post }: { post: PostProps }) {
  const user = await getUser();
  
  if (!post) {
    return <div className="text-zinc-700">No comments yet</div>;
  }
  
  const comments = await getPostComments(post.id);
  const postId = post.id;

  async function createTopLevelComment(formData: FormData) {
    "use server";
    const content = formData.get("content") as string;
    await commentOnPost(postId, content);  
  }

  return (
    <div className="flex flex-col space-y-1 text-zinc-700">
      <h2 className="border-b border-zinc-400 mb-4">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>
      
      <div className="flex items-center justify-start text-zinc-500 text-sm gap-1">
        <CircleUser className="w-5 h-5" />
        {user?.name}
      </div>
      
      <form action={createTopLevelComment} className="mt-3 bg-zinc-100 rounded-md">
        <input 
          name="content"
          className="w-full p-2 border border-zinc-300 rounded-md text-xs outline-none focus:border-orange-500 transition-all duration-150"
          type="text" 
          placeholder="Write your comments...."
          required
        />
        <div className="flex items-center gap-2 mt-2">
          <button 
            type="submit"
            className="flex items-center gap-1 bg-orange-600 text-white px-3 py-1 rounded-md text-xs hover:bg-orange-500 disabled:opacity-50 transition-all duration-150"
          >
            <Send className="w-3 h-3" />
            Comment
          </button>
          <button 
            type="button"
            className="px-3 py-1 text-xs text-zinc-500 hover:text-zinc-700 rounded-md transition-colors duration-150"
          >
            Cancel
          </button>
        </div>
      </form>
      
      {comments.length === 0 ? (
        <p className="text-zinc-500 text-sm mt-2">Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} postId={post.id} />
        ))
      )}
    </div>
  );
}
