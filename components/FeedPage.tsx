import AllPostComponents from "./AllPostComponents";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function BlogPage(){
  return (
    <div className="bg-zinc-100  mx-auto ">
      <Navbar/>
      <div className="pt-8">
        <AllPostComponents/>
      </div>
      <Footer/>
    </div>
  )
}