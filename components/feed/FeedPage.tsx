import Navbar from "./Navbar";
import PostComponent from "./PostComponent";

export default function FeedPage(){
  return (
    <div className="bg-zinc-100 min-h-screen   mx-auto px-[30px]">
      <Navbar/>
      <div className="pt-8">
        <PostComponent/>
      </div>
    </div>
  )
}