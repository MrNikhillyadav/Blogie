import { getFormattedDate } from "@/lib/utils";
import PostComments from "./Comments";
import { PostProps } from "./PostCard";
import {  ArrowLeft, MessageCircle} from "lucide-react";
import UpVotePost from "./UpVotePost";
import { getPostComments} from "@/actions/action";
import Link from "next/link"; 

export default async function PostPage({post}: {post: PostProps | null }) {

  if (!post) {
    return (
      <main className="min-h-screen bg-zinc-100">
        <div className="max-w-[800px] mx-auto px-4 py-10">
          <p className="text-[15px] text-zinc-600">Post not found.</p>
        </div>
      </main>
    );
  }
  const comments = await getPostComments(post.id)

  return (
    <main className="min-h-screen bg-zinc-100">
      <article className="max-w-[800px] mx-auto bg-zinc-100 px-4 py-10 leading-relaxed text-[15px] text-zinc-800">
      <Link href="/blog" className="inline-block px-2 py-2 "> 
        <button
          className="bg-orange-600 hover:bg-orange-500 transition-colors text-xs duration-200 px-2 py-1 rounded-md text-white cursor-pointer flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back 
        </button>
      </Link>
          <p className="text-sm text-zinc-500 mb-1">
            {getFormattedDate(post.createdAt)}
          </p>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            {post?.title}
          </h1>
          <div className=" text-xs flex gap-2 text-zinc-500 py-2 ">
            <div className=" flex flex-row justify-start  gap-4  items-center text-zinc-500 text-sm">
              {/* Upvotes */}
              <UpVotePost post={post} />

              {/* Comments */}
              <button
                type="button"
                className="group flex items-center gap-1 hover:text-orange-500 transition-colors"
              >
                <MessageCircle
                  className="w-4 h-4 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500"
                />
                {comments.length }
              </button>
            </div>
          </div>
          <p className="text-[15px] text-zinc-600">
            {post?.description}
          </p>
        </div>
      <PostComments post={post} />
      </article>
    </main>
  );
}
