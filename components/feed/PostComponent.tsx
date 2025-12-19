// components/feed/PostComponent.tsx
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react'

interface Vote {
  id : number
  voteType : "UPVOTE" | "DOWNVOTE"
}


interface PostProps {
  id : number
  title : string | null
  description : string | null
  createdAt : Date 
  commentsCount : number | null
  votes : Vote[]
}

export default async function PostComponent({id, title, description, createdAt, commentsCount, votes}:PostProps) {
  const date = createdAt.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  
  const up = votes.filter((v) => v.voteType === 'UPVOTE').length
  const down = votes.filter((v) => v.voteType === 'DOWNVOTE').length
  
  return (
    <div key={id} className="bg-zinc-100 text-black p-2 rounded-lg max-w-[800px] mx-auto px-[30px]">
          <div className="mb-4 ">
            <p className="text-zinc-500 tracking-tight text-sm ">{date}</p>
            <h2 className="text-blue-800 text-xl tracking-tighter cursor-pointer hover:underline">
              {title}
            </h2>
            <p className="text-zinc-800 tracking-tight leading-6.5  ">{description}</p>

            <div className=" flex flex-row justify-start  gap-4  items-center text-zinc-500 text-sm">
              {/* Upvotes */}
              <button
                type="button"
                className="group flex items-center gap-1 hover:text-orange-500 transition-colors"
              >
                <ThumbsUp
                  className="w-4 h-4 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500"
                />
                {up} upvotes
              </button>

              {/* Downvotes */}
              <button
                type="button"
                className="group flex items-center gap-1 hover:text-orange-500 transition-colors"
              >
                <ThumbsDown
                  className="w-4 h-4 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500"
                />
                {down} downvotes
              </button>

              {/* Comments */}
              <button
                type="button"
                className="group flex items-center gap-1 hover:text-orange-500 transition-colors"
              >
                <MessageCircle
                  className="w-4 h-4 transition-transform duration-150 group-hover:scale-110 group-hover:fill-orange-500 group-hover:stroke-orange-500"
                />
                {commentsCount} comments
              </button>
            </div>
          </div>
    </div>
  )
}
