"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const session = data?.session;
  const user = data?.user;

  useEffect(() => {
    if (!session) {
      router.push("/sign-in");
    }
  }, [session, router]);

  if (!session) {
    return (
      <main className="min-h-screen bg-zinc-100">
        <div className="max-w-[800px] mx-auto px-4 py-10">
          <p className="text-[15px] text-zinc-600">Redirecting…</p>
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
    <main className="min-h-screen bg-zinc-100">
      <div className="max-w-[800px] mx-auto px-4 py-10">
        <section className="leading-tight text-[15px] text-zinc-800">
          <button
            onClick={() => router.push("/blog")}
            className="bg-orange-500 hover:bg-orange-400 transition-colors duration-200 px-4 py-2 rounded-md text-white cursor-pointer"
          >
            back
          </button>

          <div className="mt-6 flex flex-col items-center text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Profile
            </h1>
            <p className="text-zinc-600">
              Signed in as <span className="font-medium">{user?.email}</span>
            </p>
            {user?.name && (
              <p className="text-zinc-600">Name: {user.name}</p>
            )}

            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="mt-4 bg-orange-500 hover:bg-orange-400 transition-colors duration-200 px-4 py-2 rounded-md text-white cursor-pointer disabled:opacity-60"
            >
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
