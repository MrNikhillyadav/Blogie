// app/blog/[slug]/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Blog({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: { slug },
  });

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-[800px] mx-auto px-4 py-10">
          <div className="text-sm text-zinc-500">
            <h1 className="text-4xl text-zinc-400 tracking-tighter">404 Post not found.</h1> <br/>
           <button className="bg-orange-500 hover:bg-orange-400 transition-colors duration-200 px-4 py-2 rounded-md text-white cursor-pointer ">
              <Link href="/blog" className="">Go back</Link>
           </button>
          </div>
        </div>
      </main>
    );
  }

  const createdAt = new Date(post?.createdAt);
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-zinc-100">
      <article className="max-w-[800px] mx-auto px-4 py-10 leading-relaxed text-[15px] text-zinc-800">
          <p className="text-sm text-zinc-500 mb-1">{formattedDate}</p>
        <section className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            {post?.title}
          </h1>
          {post?.description && (
            <p className="text-[15px] text-zinc-600">
              {post?.description}
            </p>
          )}
        </section>
        {/*TODO 1: ADD post.content section, add Content in model */}
      </article>
    </main>
  );
}
