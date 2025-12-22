import prisma from '@/lib/prisma'
import Link from 'next/link'
import PostCard from './PostCard'

export default async function AllPostComponents() {
  
  const posts = await prisma.post.findMany({
    include: {
      votes: {
        select : {
          id : true,
          voteType : true
        },
      },
    },
    orderBy:{
      createdAt : "desc"
    }
  })

  return (
    <>
      { 
        posts.map((posts)=> (
              <Link href={`/blog/${posts.slug}`} key={posts.id} >
                <PostCard 
                  id={posts.id} 
                  title={posts.title} 
                  description={posts.description} 
                  votes={posts.votes} 
                  commentsCount={posts.commentsCount}
                  createdAt={posts.createdAt}
                />
          </Link>))
      }
    </>
  )
}
