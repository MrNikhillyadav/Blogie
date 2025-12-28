import { Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="  border-t border-zinc-200 bg-zinc-100">
      <div className="min-h-screen">
        <div className="text-zinc-600 flex justify-between text-sm max-w-[800px] py-10 w-full mx-auto px-[30px] ">
          <p>Nikhil Yadav Blog</p>
          <a className=" text-neutral-700 flex items-center justify-center " href={'https://github.com/MrNikhillyadav'}>
            <Github className="w-4 h-4 rounded-full " />
            GitHub.
          </a> 
          <p>Full Stack Developer</p>
        </div>
      </div>
    </div>
  );
}