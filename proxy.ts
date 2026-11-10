import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// Next.js 16: middleware → proxy 로 이름 변경됨
export async function proxy(request: NextRequest) {
  return await createClient(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
