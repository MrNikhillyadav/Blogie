'use client'

import { ArrowLeft,Github } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  
  return (
    <main className=" bg-zinc-100">
      <div className="max-w-[800px] mx-auto px-4 py-10">
        <section className="leading-tight text-[15px] text-zinc-800">
          <Link href="/blog" className="inline-block px-2 py-2 "> 
            <button
              className="bg-orange-600 hover:bg-orange-500 transition-colors text-xs duration-200 px-2 py-1 rounded-md text-white cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back 
            </button>
          </Link>
             <div className='mt-4 flex flex-col  justify-center items-center'>
              <h1 className="text-2xl text-center font-semibold tracking-tight mb-4">
                About
              </h1>
              <p className="text-zinc-600 flex items-center justify-center gap-1">
                See my 
                <a className=" text-orange-700 flex items-center justify-center hover:text-blue-800" href={'https://github.com/MrNikhillyadav'}>
                  <Github className="w-4 h-4 rounded-full " />
                  GitHub.
                </a> 
              </p>
            </div>
        </section>
      </div>
    </main>
  );
}
