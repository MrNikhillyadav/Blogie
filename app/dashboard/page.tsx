"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  return (
    <main className=" h-screen flex justify-center  w-full bg-zinc-100 text-zinc-500  items-center flex-col mx-auto p-6 space-y-4 ">
         <div className="flex flex-col items-start justify-start gap-4 ">
           <button 
             onClick={() => router.push("/blog")}
             className="bg-orange-500 hover:bg-orange-400 transition-colors duration-200 px-4 py-2 rounded-md text-white cursor-pointer ">
             back
           </button>
           <div className=" min-w-[300px] border p-10 min-h-[300px] rounded-2xl bg-white border-zinc-200 flex flex-col justify-justify-center  leading-tight space-y-2 text-[15px] text-zinc-800">
             <h1 className="text-2xl font-semibold tracking-tight mb-10">
               Profile Dashboard
             </h1>
             <p>Welcome, {user.name || "User"}!</p>
             <p>Email: {user.email}</p>
           <button 
             onClick={() => signOut()}
             className="bg-orange-500 hover:bg-orange-400 transition-colors duration-200 px-4 py-2 rounded-md text-white cursor-pointer ">
             {isPending ? "Signing Out..." : "Sign Out"}
           </button>
           </div>
         </div>
    </main>
  );
}