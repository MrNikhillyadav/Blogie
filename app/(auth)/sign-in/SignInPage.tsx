
"use client";

import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn} from "@/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [isError, setIsError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

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
  
  const signInWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/blog",
    });
  };

  const signInWithGithub = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/blog",
    });
  };

  
  return (
    <main className="min-h-screen flex items-center justify-center w-full  bg-zinc-100 ">
     <div  className="max-w-md  full flex py-20 items-center justify-center flex-col mx-auto p-6 space-y-4">
       <h1 className="text-2xl text-neutral-900 font-bold">Sign In</h1>
 
       {isError && <p className="text-xs text-red-400">{isError}</p>}
 
       <button
         type="button"
         onClick={signInWithGoogle}
         title="Sign-in with Google"
         aria-label="Sign-in with Google"
         className="w-full cursor-pointer bg-zinc-50  border border-zinc-200 text-zinc-500 font-medium rounded-md px-4 py-2 hover:bg-white"
       >
          <div className="flex text-zinc-600 items-center gap-2 justify-center" >
            <div className="text-zinc-600">Sign In with Google</div> <FaGoogle className=" w-4 h-4" />
          </div>
       </button>
       <button
         type="button"
         title="Sign in with GitHub"  
        aria-label="Sign in with GitHub"
         onClick={signInWithGithub}
         className="w-full cursor-pointer bg-zinc-50  border border-zinc-200 text-zinc-500 font-medium rounded-md px-4 py-2 hover:bg-white"
       >
          <div className="flex text-zinc-600 items-center gap-2 justify-center" >
            Sign In with Github <FaGithub className=" w-4 h-4" />
          </div>
       </button>
 
       <form onSubmit={handleSubmit} className="space-y-4">
         <input
           name="email"
           ref={emailRef}
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