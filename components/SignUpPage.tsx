"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
      console.log("email:", formData.get("email"))
      console.log("password:", formData.get("password"))

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/blog");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center  w-full  bg-zinc-100 ">
     <div  className="max-w-md  full flex py-20 items-center justify-center flex-col mx-auto p-6 space-y-4">
      <h1 className="text-2xl text-neutral-800 font-bold">Sign Up</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full rounded-md bg-zinc-50 border border-zinc-200 text-zinc-700 px-3 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md bg-zinc-50 border border-zinc-200 text-zinc-700 px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={4}
          className="w-full rounded-md bg-zinc-50 border border-zinc-200 text-zinc-700 px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-neutral-900 text-zinc-100 font-medium rounded-md cursor-pointer px-4 py-2 hover:bg-neutral-800"
        >
          Create Account
        </button>
        <p className="text-center cursor-pointer text-zinc-600 ">
          Don&apos;t have an account? <Link className="cursor-pointer hover:underline" href="/sign-in">Sign In</Link>
        </p>
      </form>
    </div>
    </main>
  );
}