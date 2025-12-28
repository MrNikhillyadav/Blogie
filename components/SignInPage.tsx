"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn} from "@/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [isError, setIsError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setIsError(res.error.message || "Something went wrong.");
      setIsSubmitting(false);
    } else {
      router.push("/blog");
    }
  }
  
  return (
    <main className="min-h-screen flex items-center justify-center w-full  bg-zinc-100 ">
     <div  className="max-w-md  full flex py-20 items-center justify-center flex-col mx-auto p-6 space-y-4">
       <h1 className="text-2xl text-neutral-900 font-bold">Sign In</h1>
 
       {isError && <p className="text-xs text-red-400">{isError}</p>}
 
       <form onSubmit={handleSubmit} className="space-y-4">
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
           className="w-full rounded-md bg-zinc-50 border border-zinc-200 text-zinc-700 px-3 py-2"
         />
         <button
           type="submit"
           className="w-full cursor-pointer bg-neutral-900  border-neutral-700 text-zinc-100 font-medium rounded-md px-4 py-2 hover:bg-gray-800"
         >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
         </button>
         <p className="text-center cursor-pointer text-zinc-600 ">
           Don&apos;t have an account? <Link className="cursor-pointer hover:underline" href="/sign-up">Sign Up</Link>
         </p>
       </form>
     </div>
    </main>
  );
}