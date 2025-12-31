
export interface Vote {
  id : number
  voteType : "UPVOTE" | "DOWNVOTE"
}


export interface PostProps {
  id : number
  title : string | null
  description : string | null
  createdAt : Date 
  commentsCount : number | null
  votes : Vote[]
}

export default async function PostCard({id, title, description, createdAt}:PostProps) {
  
  const date = createdAt.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  
  return (
    <div key={id} className="bg-zinc-100 text-black p-2 rounded-lg max-w-[800px] mx-auto px-[30px]">
          <div className="mb-4 ">
            <p className="text-zinc-500 tracking-tight text-sm ">{date}</p> 
            <h2 className="text-blue-800 text-xl tracking-tighter cursor-pointer hover:underline">
              {title}
            </h2>
            <p className="text-zinc-800 tracking-tight leading-6.5  ">{description?.substring(0, 275)}.</p>
          </div>
    </div>
  )
}
