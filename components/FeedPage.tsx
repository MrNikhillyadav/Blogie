import AllPostComponents from "./AllPostComponents";
import Navbar from "./Navbar";

export default function BlogPage(){
  return (
    <div className="bg-zinc-100 min-h-screen   mx-auto px-[30px]">
      <Navbar/>
      <div className="pt-8">
        <AllPostComponents/>
      </div>
    </div>
  )
}