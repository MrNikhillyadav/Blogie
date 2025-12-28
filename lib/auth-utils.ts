import { headers } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";

export const authSession = cache(async () => {
  try {
    const session = auth.api.getSession({ headers: await headers() });

    if (!session) {
      throw new Error("Unauthorized: No valid session found");
    }

    return session;
  } catch {
    throw new Error("Authentication failed");
  }
});