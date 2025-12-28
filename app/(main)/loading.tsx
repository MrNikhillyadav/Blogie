import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex bg-zinc-100  items-center justify-center p-6">
      <Loader2 className="text-neutral-800 size-8 animate-spin" />
    </div>
  );
}