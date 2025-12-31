"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { useState } from "react";
import { ArrowLeft, User, Mail, User as UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const { data } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const session = data?.session;
  const user = data?.user;
  

  if (!session || !user) {
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
      window.location.href = '/sign-in';  
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

          <div className="mt-6 flex flex-col items-center text-center space-y-6">
            {user?.image ? (
              <Image 
                width={96}
                height={96}
                src={user.image} 
                alt={user.name} 
                className="w-24 h-24 rounded-full" />
            ) : (
              <User className="w-8 h-8 text-orange-600" />
            )}
            
            <h1 className="text-xl text-orange-600 font-semibold tracking-tight">
              Hi! {user?.name || 'Anonymous'}
            </h1>
            
            <div className="w-full max-w-xs space-y-4">
              {user?.name && (
                <div className="flex items-center gap-3 p-2 border border-orange-200  text-sm rounded-lg">
                  <UserIcon className="w-4 h-4 text-orange-600 " />
                  <div>
                    <p className="text-zinc-600">Username: {user.name}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-2  border border-orange-200 text-sm rounded-lg">
                <Mail className="w-4 h-4 text-orange-600 " />
                <div>
                  <p className="text-zinc-600">
                    Email: <span className="font-normal">{user?.email}</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full max-w-xs bg-orange-600 shadow-sm border-orange-400 text-xs hover:bg-orange-500 transition-colors duration-200 px-4 py-2 rounded-md text-white cursor-pointer disabled:opacity-60"
            >
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
