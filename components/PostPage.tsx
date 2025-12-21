import { getFormattedDate } from "@/lib/utils";
import PostComments from "./Comments";
import { PostProps } from "./PostCard";

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

  return (
    <main className="min-h-screen bg-zinc-100">
      <article className="max-w-[800px] mx-auto bg-zinc-100 px-4 py-10 leading-relaxed text-[15px] text-zinc-800">
          <p className="text-sm text-zinc-500 mb-1">
            {getFormattedDate(post.createdAt)}
          </p>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            {post?.title}
          </h1>
          <p className="text-[15px] text-zinc-600">
            {post?.description}
          </p>
        </div>
      <PostComments post={post} />
      </article>
    </main>
  );
}
