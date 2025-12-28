import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Loader2 className="text-neutral-900 size-8 animate-spin" />
    </div>
  );
}