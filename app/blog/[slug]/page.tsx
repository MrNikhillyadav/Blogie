import PostPage from "@/components/PostPage";
import prisma from "@/lib/prisma";

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: { slug },
    include : {
      votes : {
        select : {
          id : true,
          voteType : true
        }
      }
    }
  });
  
  if(!post){
    return <div>Post not found</div>
  }
  
  return (
    <div>
      <PostPage post={post} />
    </div>
  )}
