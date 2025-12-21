'use client'
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();
  
  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="max-w-[800px] mx-auto px-4 py-10">
        <section className="leading-tight text-[15px] text-zinc-800">
            <button 
              onClick={() => router.push("/blog")}
              className="bg-orange-500 hover:bg-orange-400 transition-colors duration-200 px-4 py-2 rounded-md text-white cursor-pointer ">
              back
            </button>
             <div className='mt-4 flex flex-col  justify-center items-center'>
              <h1 className="text-2xl text-center font-semibold tracking-tight mb-4">
                About
              </h1>
              <p className="text-zinc-600">See my <a className=" text-blue-700 hover:text-blue-800 underline" href={'https://github.com/MrNikhillyadav'}>GitHub.</a> </p>
            </div>
        </section>
      </div>
    </main>
  );
}
