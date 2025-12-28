"use client";


import { signOut, useSession } from "@/lib/auth-client";
import { useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const session = data?.session;
  const user = data?.user;


  if (!session) {
    return (
      <main className=" bg-zinc-100">
        <div className="max-w-[800px] mx-auto px-4 py-10">
          <p className="text-[15px] text-zinc-600 text-center">loading…</p>
        </div>
      </main>
    );
  }

  async function handleSignOut() {
    try {
      setIsSigningOut(true);
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  }

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

          <div className="mt-6 flex flex-col items-center text-center space-y-2">
              <User className="w-8 h-8 text-orange-600" />
            <h1 className="text-xl text-zinc-600 font-semibold tracking-tight">
              H! {user?.name || 'Anonymous'}
            </h1>
           <div className="flex flex-col text-sm my-2 items-center justify-center">
             {user?.name && (
              <p className="text-zinc-600">Username: {user.name}</p>
            )}
            <p className="text-zinc-600">
              Email : <span className="font-normal">{user?.email}</span>
            </p>
            </div>

            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="mt-4 bg-neutral-300  shadow-sm border-neutral-200 text-xs hover:bg-neutral-400 transition-colors duration-200 px-4 py-2 rounded-md text-white cursor-pointer disabled:opacity-60"
            >
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
